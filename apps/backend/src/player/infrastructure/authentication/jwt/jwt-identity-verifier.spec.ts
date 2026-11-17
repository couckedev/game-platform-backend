import { describe, expect, it } from 'vitest';
import {
  ExpiredAuthenticationError,
  InvalidCredentialsError,
  MissingSubjectError,
} from '../common';
import { JwtdentityProviderServer } from './jwt-identity-provider-server';
import { JwtIdentityVerifier } from './jwt-identity-verifier';

describe(JwtIdentityVerifier.name, () => {
  let identityProviderServer: JwtdentityProviderServer;

  beforeAll(async () => {
    identityProviderServer = await JwtdentityProviderServer.createInstance();
  });
  it('returns authenticated identity', async () => {
    const identityVerifier = new JwtIdentityVerifier(identityProviderServer.keySource);
    const token = await identityProviderServer.generateTokenFor({ sub: 'external-account-id' });

    const verification = await identityVerifier.verify({ token });

    expect(verification).toStrictEqual({
      externalAccountId: 'external-account-id',
    });
  });

  it('throws error if subject is missing from verification payload', async () => {
    const identityVerifier = new JwtIdentityVerifier(identityProviderServer.keySource);
    const token = await identityProviderServer.generateTokenFor({});

    const verification = identityVerifier.verify({ token });

    await expect(verification).rejects.toBeInstanceOf(MissingSubjectError);
  });

  it('throws error if token is invalid', async () => {
    const identityVerifier = new JwtIdentityVerifier(identityProviderServer.keySource);
    const token = 'some-wrong-token';

    const verification = identityVerifier.verify({ token });

    await expect(verification).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('throws error if authentication has expired', async () => {
    const identityVerifier = new JwtIdentityVerifier(identityProviderServer.keySource);
    const token = await identityProviderServer.generateTokenFor({
      sub: 'external-account-id',
      exp: Math.floor(Date.now() / 1000) - 60,
    });

    const verification = identityVerifier.verify({ token });

    await expect(verification).rejects.toBeInstanceOf(ExpiredAuthenticationError);
  });
});
