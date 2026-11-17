import { AuthenticatedIdentity } from './authenticated-identity.interface';

export interface IdentityVerifier<Credentials> {
  verify(credentials: Credentials): Promise<AuthenticatedIdentity>;
}
