import {
  type AuthenticatedIdentity,
  IdentityVerificationFailedError,
  type IdentityVerifier,
} from '../../authentication/common';
import { HttpAuthorizationError } from './http-authorization.error';

export class HttpAuthenticationGuard {
  constructor(private readonly identityVerifier: IdentityVerifier) {}

  async authenticate(
    authorizationToken?: string,
  ): Promise<AuthenticatedIdentity> {
    try {
      if (authorizationToken === undefined || authorizationToken.length === 0) {
        throw new HttpAuthorizationError('MISSING_BEARER_TOKEN');
      }
      if (!authorizationToken.startsWith('Bearer ')) {
        throw new HttpAuthorizationError('WRONG_BEARER_TOKEN_FORMAT');
      }
      return await this.identityVerifier.verify(
        authorizationToken.split('Bearer ')[1],
      );
    } catch (error) {
      if (error instanceof IdentityVerificationFailedError) {
        throw new HttpAuthorizationError(error.reason);
      }
      throw error;
    }
  }
}
