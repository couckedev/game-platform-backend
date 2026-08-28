import { type JWTVerifyGetKey, jwtVerify } from 'jose';
import {
  JWSSignatureVerificationFailed,
  JWTClaimValidationFailed,
  JWTExpired,
} from 'jose/errors';
import {
  type AuthenticatedIdentity,
  IdentityVerificationFailedError,
  IdentityVerificationFailureReason,
  type IdentityVerifier,
} from '../common';

export class JwtIdentityVerifier implements IdentityVerifier {
  constructor(
    private readonly keyResolver: JWTVerifyGetKey,
    private readonly expectedIssuer: string,
  ) {}

  async verify(token: string): Promise<AuthenticatedIdentity> {
    try {
      const tokenData = await jwtVerify(token, this.keyResolver, {
        issuer: this.expectedIssuer,
      });
      if (tokenData.payload.sub === undefined) {
        throw new IdentityVerificationFailedError(
          IdentityVerificationFailureReason.MissingSubject,
        );
      }
      return {
        externalAccountId: tokenData.payload.sub,
      };
    } catch (error) {
      if (error instanceof JWTClaimValidationFailed) {
        throw new IdentityVerificationFailedError(
          IdentityVerificationFailureReason.WrongIssuerUrl,
        );
      }
      if (error instanceof JWTExpired) {
        throw new IdentityVerificationFailedError(
          IdentityVerificationFailureReason.TokenExpired,
        );
      }
      if (error instanceof JWSSignatureVerificationFailed) {
        throw new IdentityVerificationFailedError(
          IdentityVerificationFailureReason.WrongSignature,
        );
      }
      throw error;
    }
  }
}
