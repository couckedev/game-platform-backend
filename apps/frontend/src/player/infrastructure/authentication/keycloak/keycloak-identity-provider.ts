import type Keycloak from 'keycloak-js';
import type { IdentityProvider } from '../common';

export class KeycloakIdentityProvider implements IdentityProvider {
  constructor(private readonly keycloakInstance: Keycloak) {}

  async signIn(provider: string): Promise<void> {
    await this.keycloakInstance.login({ loginHint: provider });
  }

  signOut(): void {}

  get identity() {
    if (!this.keycloakInstance.authenticated || this.keycloakInstance.subject === undefined) {
      return null;
    }
    return { externalAccountId: this.keycloakInstance.subject };
  }
}
