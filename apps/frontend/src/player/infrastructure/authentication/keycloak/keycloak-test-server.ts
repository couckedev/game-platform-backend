import { randomUUID } from 'node:crypto';
import KeycloakAdminClient from '@keycloak/keycloak-admin-client';

const REALM = 'game-platform';
const CLIENT_ID = 'frontend';

export class KeycloakTestServer {
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
    const client = new KeycloakAdminClient({ baseUrl: this._url, realmName: this.config.realm });
    await client.auth({
      grantType: 'password',
      clientId: this.config.clientId,
      username,
      password,
    });
    return { token: client.accessToken, refreshToken: client.refreshToken };
  }

  async admin() {
    const admin = new KeycloakAdminClient({ baseUrl: this._url, realmName: 'master' });
    await admin.auth({
      grantType: 'password',
      clientId: 'admin-cli',
      username: 'admin',
      password: 'admin',
    });
    return admin;
  }
}
