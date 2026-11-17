import type { AuthenticatedIdentity } from '@/app/authentication/common';

export class InMemoryIdentityProviderServer {
  private _authenticatedIdentity: AuthenticatedIdentity | null = null;

  setIdentity(externalAccountId: string) {
    this._authenticatedIdentity = {
      externalAccountId,
    };
  }

  get identity(): AuthenticatedIdentity | null {
    return this._authenticatedIdentity;
  }

  requireIdentity(): AuthenticatedIdentity {
    if (this._authenticatedIdentity === null) {
      throw new Error('No user is authenticated yet');
    }
    return this._authenticatedIdentity;
  }
}
