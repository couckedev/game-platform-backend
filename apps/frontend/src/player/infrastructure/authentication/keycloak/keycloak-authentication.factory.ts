import Keycloak, { type KeycloakConfig } from 'keycloak-js';
import { KeycloakAccessTokenProvider } from './keycloak-access-token-provider';
import { KeycloakIdentityProvider } from './keycloak-identity-provider';

export async function createKeycloakAuthentication(keycloakConfig: KeycloakConfig) {
  const keycloakInstance = new Keycloak(keycloakConfig);
  await keycloakInstance.init({ checkLoginIframe: false });
  return {
    identityProvider: new KeycloakIdentityProvider(keycloakInstance),
    accessTokenProvider: new KeycloakAccessTokenProvider(keycloakInstance),
  };
}
