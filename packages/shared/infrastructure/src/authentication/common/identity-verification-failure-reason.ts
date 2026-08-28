export const IdentityVerificationFailureReason = {
  TokenExpired: 'TOKEN_EXPIRED',
  MissingSubject: 'MISSING_SUBJECT',
  WrongSignature: 'WRONG_SIGNATURE',
  WrongIssuerUrl: 'WRONG_ISSUER_URL',
} as const;

export type IdentityVerificationFailureReason =
  (typeof IdentityVerificationFailureReason)[keyof typeof IdentityVerificationFailureReason];
