import type { AuthenticatedIdentity, IdentityProvider } from '@/app/authentication/common';
import type { InMemoryIdentityProviderServer } from './in-memory-identity-provider-server';

export class InMemoryIdentityProvider implements IdentityProvider {
  private _identity: AuthenticatedIdentity | null = null;

  constructor(private readonly identityProviderServer: InMemoryIdentityProviderServer) {}

  signInWith() {
    return;
  }

  restore() {
    this._identity = this.identityProviderServer.identity;
  }

  get identity(): AuthenticatedIdentity | null {
    return this._identity;
  }
}
