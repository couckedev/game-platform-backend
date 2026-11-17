import Keycloak from 'keycloak-js';
import { GenericContainer, type StartedTestContainer, Wait } from 'testcontainers';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { KeycloakAccessTokenProvider } from './keycloak-access-token-provider';
import { KeycloakIdentityProvider } from './keycloak-identity-provider';
import { KeycloakTestServer } from './keycloak-test-server';

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

  it('returns access token if user is signed in', async () => {
    const user = await keycloakServer.createUser('firstname', 'lastname', 'password');
    const session = await keycloakServer.sessionFor(user.username, 'password');
    const keycloak = new Keycloak(keycloakServer.config);
    await keycloak.init({ checkLoginIframe: false, ...session });
    const keycloakAccessTokenProvider = new KeycloakAccessTokenProvider(keycloak);

    expect(keycloakAccessTokenProvider.requireAccessToken()).toStrictEqual(keycloak.token);
  });

  it('throws error if user is not signed in', async () => {
    const keycloak = new Keycloak(keycloakServer.config);
    await keycloak.init({ checkLoginIframe: false });
    const keycloakAccessTokenProvider = new KeycloakAccessTokenProvider(keycloak);

    expect(() => keycloakAccessTokenProvider.requireAccessToken()).toThrow(Error);
  });
});
