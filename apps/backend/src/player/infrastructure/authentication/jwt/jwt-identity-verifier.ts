import { JWTVerifyGetKey, jwtVerify } from 'jose';
import { JWSInvalid, JWTExpired } from 'jose/errors';
import {
  AuthenticatedIdentity,
  ExpiredAuthenticationError,
  IdentityVerifier,
  InvalidCredentialsError,
  MissingSubjectError,
} from '../common';
import { JwtCredentials } from './jwt-credentials.interface';

export class JwtIdentityVerifier implements IdentityVerifier<JwtCredentials> {
  constructor(private readonly _keySource: JWTVerifyGetKey) {}

  async verify(credentials: JwtCredentials): Promise<AuthenticatedIdentity> {
    try {
      const verification = await jwtVerify(credentials.token, this._keySource);
      if (verification.payload.sub === undefined) {
        throw new MissingSubjectError();
      }
      return { externalAccountId: verification.payload.sub };
    } catch (error) {
      if (error instanceof JWSInvalid) {
        throw new InvalidCredentialsError();
      }
      if (error instanceof JWTExpired) {
        throw new ExpiredAuthenticationError();
      }
      throw error;
    }
  }
}
