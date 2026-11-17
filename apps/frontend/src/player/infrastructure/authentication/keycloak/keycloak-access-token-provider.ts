import type Keycloak from 'keycloak-js';
import type { AccessTokenProvider } from '@/player/infrastructure/authentication/common/access-token-provider.interface';

export class KeycloakAccessTokenProvider implements AccessTokenProvider {
  constructor(private readonly keycloakInstance: Keycloak) {}
  requireAccessToken(): string {
    if (!this.keycloakInstance.token) {
      throw new Error('User is not signed in');
    }
    return this.keycloakInstance.token;
  }
}
