import type { AuthenticatedUserIdentity, IdentityProvider } from '../common';
import type { InMemoryIdentityProviderServer } from './in-memory-identity-provider-server';

export class InMemoryIdentityProvider implements IdentityProvider {
  _authenticatedUserIdentity: AuthenticatedUserIdentity | null = null;

  constructor(private readonly identityProviderServer: InMemoryIdentityProviderServer) {}

  signIn() {
    this._authenticatedUserIdentity = {
      externalAccountId: `${this.identityProviderServer.requireIdentity()}`,
    };
  }

  signOut(): void {
    this._authenticatedUserIdentity = null;
  }

  restore(): void {
    if (this.identityProviderServer.identity !== null) {
      this.signIn();
    }
  }

  get identity() {
    return this._authenticatedUserIdentity;
  }
}
