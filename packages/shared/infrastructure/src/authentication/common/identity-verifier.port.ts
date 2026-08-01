import type { AuthenticatedIdentity } from './index.js';

export interface IdentityVerifier {
  verify(token: string): Promise<AuthenticatedIdentity>;
}
