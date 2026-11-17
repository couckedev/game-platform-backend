import { randomUUID } from 'node:crypto';
import KcAdminClient from '@keycloak/keycloak-admin-client';
import Keycloak from 'keycloak-js';
import { GenericContainer, type StartedTestContainer, Wait } from 'testcontainers';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { KeycloakIdentityProvider } from './keycloak-identity-provider';

const REALM = 'game-platform';
const CLIENT_ID = 'frontend';

class KeycloakTestServer {
  constructor(private readonly _url: string) {}

  get config() {
    return { clientId: CLIENT_ID, realm: REALM, url: this._url };
  }

  // the only shared prerequisite: a realm and a client
  async createRealmAndClient() {
    const admin = await this.admin();
    await admin.realms.create({ realm: REALM, enabled: true });
    await admin.clients.create({
      realm: REALM,
      clientId: CLIENT_ID,
      publicClient: true,
      directAccessGrantsEnabled: true,
      redirectUris: ['*'],
      webOrigins: ['*'],
    });
  }

  async createUser(firstName: string, lastName: string, password: string) {
    const username = `user-${randomUUID()}`;
    const admin = await this.admin();
    const { id } = await admin.users.create({
      realm: REALM,
      username,
      enabled: true,
      email: `${username}@test.local`,
      emailVerified: true,
      firstName,
      lastName,
      credentials: [{ type: 'password', value: password, temporary: false }],
    });
    return { id, username };
  }

  async sessionFor(username: string, password: string) {
    const client = new KcAdminClient({ baseUrl: this._url, realmName: this.config.realm });
    await client.auth({
      grantType: 'password',
      clientId: this.config.clientId,
      username,
      password,
    });
    return { token: client.accessToken, refreshToken: client.refreshToken };
  }

  async admin() {
    const admin = new KcAdminClient({ baseUrl: this._url, realmName: 'master' });
    await admin.auth({
      grantType: 'password',
      clientId: 'admin-cli',
      username: 'admin',
      password: 'admin',
    });
    return admin;
  }
}

describe(KeycloakIdentityProvider.name, () => {
  let container: StartedTestContainer;
  let keycloakServer: KeycloakTestServer;

  beforeAll(async () => {
    container = await new GenericContainer('quay.io/keycloak/keycloak:26.0')
      .withCommand(['start-dev'])
      .withEnvironment({
        KC_BOOTSTRAP_ADMIN_USERNAME: 'admin',
        KC_BOOTSTRAP_ADMIN_PASSWORD: 'admin',
      })
      .withExposedPorts(8080)
      .withWaitStrategy(Wait.forHttp('/realms/master', 8080))
      .withStartupTimeout(120_000)
      .start();
    keycloakServer = new KeycloakTestServer(
      `http://${container.getHost()}:${container.getMappedPort(8080)}`,
    );
    await keycloakServer.createRealmAndClient();
  }, 180_000);

  afterAll(() => container.stop());

  it('returns the authenticated identity of a signed in user', async () => {
    const user = await keycloakServer.createUser('firstname', 'lastname', 'password');
    const session = await keycloakServer.sessionFor(user.username, 'password');
    const keycloak = new Keycloak(keycloakServer.config);
    await keycloak.init({ checkLoginIframe: false, ...session });
    const keycloakIdentityProvider = new KeycloakIdentityProvider(keycloak);

    expect(keycloakIdentityProvider.identity).toStrictEqual({ externalAccountId: user.id });
  });

  it('returns null if no user is signed in', async () => {
    const keycloak = new Keycloak(keycloakServer.config);
    await keycloak.init({ checkLoginIframe: false });
    const keycloakIdentityProvider = new KeycloakIdentityProvider(keycloak);

    expect(keycloakIdentityProvider.identity).toBeNull();
  });
});
