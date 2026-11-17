import type { AuthenticatedUserIdentity } from './authenticated-user-identity.interface';

export interface IdentityProvider {
  signIn(provider: string): void;
  signOut(): void;
  restore(): void;
  identity: AuthenticatedUserIdentity | null;
}
