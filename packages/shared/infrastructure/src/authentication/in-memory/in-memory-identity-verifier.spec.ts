import { describe, expect, it } from 'vitest';
import {
  type AuthenticatedIdentity,
  IdentityVerificationFailedError,
} from '../common';
import { InMemoryIdentityVerifier } from './in-memory-identity-verifier';

describe(InMemoryIdentityVerifier, () => {
  it('throws an error if identity verification result has not been set', async () => {
    const identityVerifier = new InMemoryIdentityVerifier();

    const verification = async () => await identityVerifier.verify();

    await expect(verification).rejects.toThrow(
      new Error('Identity verifier must be initialized before using it'),
    );
  });

  it('returns authenticated identity which has been set before', async () => {
    const identityVerifier = new InMemoryIdentityVerifier();
    const authenticatedIdentity: AuthenticatedIdentity = {
      externalAccountId: 'external-account-id',
    };
    identityVerifier.verificationResult = authenticatedIdentity;

    const verificationResult = await identityVerifier.verify();

    expect(verificationResult).toStrictEqual(authenticatedIdentity);
  });

  it('throw identity verification error which has been set before', async () => {
    const identityVerifier = new InMemoryIdentityVerifier();
    identityVerifier.verificationResult = new IdentityVerificationFailedError();

    const verification = async () => await identityVerifier.verify();

    await expect(verification).rejects.toThrow(
      new IdentityVerificationFailedError(),
    );
  });
});
