import Keycloak, { type KeycloakConfig } from 'keycloak-js';

export const createKeycloakInstance = (keycloakConfig: KeycloakConfig) =>
  new Keycloak(keycloakConfig);
