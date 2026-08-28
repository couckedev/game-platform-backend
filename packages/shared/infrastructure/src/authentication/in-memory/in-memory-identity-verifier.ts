import {
  type AuthenticatedIdentity,
  IdentityVerificationFailedError,
  type IdentityVerifier,
} from '../common';

export class InMemoryIdentityVerifier implements IdentityVerifier {
  private _verificationResult:
    | AuthenticatedIdentity
    | IdentityVerificationFailedError
    | null = null;

  async verify() {
    if (this._verificationResult === null) {
      throw new Error('Identity verifier must be initialized before using it');
    }
    if (this._verificationResult instanceof IdentityVerificationFailedError)
      throw this._verificationResult;
    return this._verificationResult;
  }

  set verificationResult(verificationResult:
    | AuthenticatedIdentity
    | IdentityVerificationFailedError) {
    this._verificationResult = verificationResult;
  }
}
