import type { IdentityVerificationFailureReason } from './identity-verification-failure-reason';

export class IdentityVerificationFailedError extends Error {
  constructor(public readonly reason: IdentityVerificationFailureReason) {
    super(`Identity verification failed (reason: ${reason})`);
  }
}
