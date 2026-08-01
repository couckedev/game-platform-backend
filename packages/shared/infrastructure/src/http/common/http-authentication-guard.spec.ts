import { describe, expect, it } from 'vitest';
import {
  IdentityVerificationFailedError,
  IdentityVerificationFailureReason,
} from '../../authentication/common';
import { InMemoryIdentityVerifier } from '../../authentication/in-memory';
import { HttpAuthenticationGuard } from './http-authentication-guard';
import { HttpAuthorizationError } from './http-authorization.error';

describe(HttpAuthenticationGuard, () => {
  it('rejects request if authorization header is empty', async () => {
    const authorizationHeader = '';
    const identityVerifier = new InMemoryIdentityVerifier();
    const httpAuthenticationGuard = new HttpAuthenticationGuard(
      identityVerifier,
    );

    const authentication = async () =>
      httpAuthenticationGuard.authenticate(authorizationHeader);

    await expect(authentication).rejects.toThrow(
      new HttpAuthorizationError('MISSING_BEARER_TOKEN'),
    );
  });

  it('rejects request if authorization header does not contain a valid bearer token', async () => {
    const authorizationHeader = 'invalid-bearer-token';
    const identityVerifier = new InMemoryIdentityVerifier();
    const httpAuthenticationGuard = new HttpAuthenticationGuard(
      identityVerifier,
    );

    const authentication = async () =>
      httpAuthenticationGuard.authenticate(authorizationHeader);

    await expect(authentication).rejects.toThrow(
      new HttpAuthorizationError('WRONG_BEARER_TOKEN_FORMAT'),
    );
  });

  it('rejects request if identity verification with bearer token has failed', async () => {
    const authorizationHeader = 'Bearer valid-bearer-token';
    const identityVerifier = new InMemoryIdentityVerifier();
    identityVerifier.verificationResult = new IdentityVerificationFailedError(
      IdentityVerificationFailureReason.MissingSubject,
    );
    const httpAuthenticationGuard = new HttpAuthenticationGuard(
      identityVerifier,
    );

    const authentication = async () =>
      httpAuthenticationGuard.authenticate(authorizationHeader);

    await expect(authentication).rejects.toThrow(
      new HttpAuthorizationError(
        IdentityVerificationFailureReason.MissingSubject,
      ),
    );
  });

  it('rejects request if bearer token is undefined', async () => {
    const identityVerifier = new InMemoryIdentityVerifier();
    const httpAuthenticationGuard = new HttpAuthenticationGuard(
      identityVerifier,
    );

    const authentication = async () =>
      httpAuthenticationGuard.authenticate(undefined);

    await expect(authentication).rejects.toThrow(
      new HttpAuthorizationError('MISSING_BEARER_TOKEN'),
    );
  });
});
