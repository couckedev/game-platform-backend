import type { AuthenticatedIdentity } from './authenticated-identity.interface';

export interface IdentityProvider {
  signInWith(): void;
  restore(): void;
  identity: AuthenticatedIdentity | null;
}
