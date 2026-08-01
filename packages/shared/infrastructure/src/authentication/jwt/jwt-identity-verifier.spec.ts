import {
  exportJWK,
  generateKeyPair,
  type JWTVerifyGetKey,
  SignJWT,
} from 'jose';
import { describe, expect, it } from 'vitest';
import {
  IdentityVerificationFailedError,
  IdentityVerificationFailureReason,
} from '../common';
import { JwtIdentityVerifier } from './jwt-identity-verifier';

describe(JwtIdentityVerifier, () => {
  it('return authenticated identity containing provider user id from token if token is valid', async () => {
    const expectedIssuer = 'https://issuer.test';
    const providerUserId = 'provider-user-id';
    const { publicKey, privateKey } = await generateKeyPair('RS256');
    const token = await new SignJWT({
      sub: providerUserId,
    })
      .setProtectedHeader({ alg: 'RS256' })
      .setIssuer(expectedIssuer)
      .setExpirationTime('1h')
      .sign(privateKey);
    const keyResolver: JWTVerifyGetKey = async () => {
      return publicKey;
    };
    const identityVerifier = new JwtIdentityVerifier(
      keyResolver,
      expectedIssuer,
    );

    const authenticatedIdentity = await identityVerifier.verify(token);
    expect(authenticatedIdentity).toStrictEqual({
      externalAccountId: providerUserId,
    });
  });

  it('fails if issuer from token is not the expected issuer', async () => {
    const expectedIssuer = 'https://issuer.test';
    const providerUserId = 'provider-user-id';
    const { publicKey, privateKey } = await generateKeyPair('RS256');
    const token = await new SignJWT({
      sub: providerUserId,
    })
      .setProtectedHeader({ alg: 'RS256' })
      .setIssuer('another-issuer-url')
      .setExpirationTime('1h')
      .sign(privateKey);
    const keyResolver: JWTVerifyGetKey = async () => {
      return publicKey;
    };
    const identityVerifier = new JwtIdentityVerifier(
      keyResolver,
      expectedIssuer,
    );

    const identityVerification = async () => identityVerifier.verify(token);
    await expect(identityVerification).rejects.toThrow(
      new IdentityVerificationFailedError(
        IdentityVerificationFailureReason.WrongIssuerUrl,
      ),
    );
  });

  it('fails if token has expired', async () => {
    const expectedIssuer = 'https://issuer.test';
    const providerUserId = 'provider-user-id';
    const { publicKey, privateKey } = await generateKeyPair('RS256');
    const token = await new SignJWT({
      sub: providerUserId,
    })
      .setProtectedHeader({ alg: 'RS256' })
      .setIssuer(expectedIssuer)
      .setExpirationTime('-1h')
      .sign(privateKey);
    const keyResolver: JWTVerifyGetKey = async () => {
      return publicKey;
    };
    const identityVerifier = new JwtIdentityVerifier(
      keyResolver,
      expectedIssuer,
    );

    const identityVerification = async () => identityVerifier.verify(token);
    await expect(identityVerification).rejects.toThrow(
      new IdentityVerificationFailedError(
        IdentityVerificationFailureReason.TokenExpired,
      ),
    );
  });

  it('fails if token does not contain subject', async () => {
    const expectedIssuer = 'https://issuer.test';
    const { publicKey, privateKey } = await generateKeyPair('RS256');
    const token = await new SignJWT()
      .setProtectedHeader({ alg: 'RS256' })
      .setIssuer(expectedIssuer)
      .setExpirationTime('1h')
      .sign(privateKey);
    const keyResolver: JWTVerifyGetKey = async () => {
      return publicKey;
    };
    const identityVerifier = new JwtIdentityVerifier(
      keyResolver,
      expectedIssuer,
    );

    const identityVerification = async () => identityVerifier.verify(token);
    await expect(identityVerification).rejects.toThrow(
      new IdentityVerificationFailedError(
        IdentityVerificationFailureReason.MissingSubject,
      ),
    );
  });

  it('fails if token signature is wrong', async () => {
    const expectedIssuer = 'https://issuer.test';
    const providerUserId = 'provider-user-id';
    const { publicKey: wrongPublicKey } = await generateKeyPair('RS256');
    const { privateKey } = await generateKeyPair('RS256');
    const token = await new SignJWT({
      sub: providerUserId,
    })
      .setProtectedHeader({ alg: 'RS256' })
      .setIssuer('another-issuer-url')
      .setExpirationTime('1h')
      .sign(privateKey);
    const keyResolver: JWTVerifyGetKey = async () => {
      return wrongPublicKey;
    };
    const identityVerifier = new JwtIdentityVerifier(
      keyResolver,
      expectedIssuer,
    );

    const identityVerification = async () => identityVerifier.verify(token);
    await expect(identityVerification).rejects.toThrow(
      new IdentityVerificationFailedError(
        IdentityVerificationFailureReason.WrongSignature,
      ),
    );
  });
});
