import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test, type TestingModule } from '@nestjs/testing';
import { beforeEach, describe, it } from 'vitest';
import { JwtdentityProviderServer } from '@/player/infrastructure/authentication/jwt';
import { PlayerTestingModule } from '@/player/infrastructure/nestjs';

describe('Player authentication', () => {
  let app: NestFastifyApplication;
  let identityProviderServer: JwtdentityProviderServer;

  beforeEach(async () => {
    identityProviderServer = await JwtdentityProviderServer.createInstance();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        PlayerTestingModule.forRoot({ authenticationKeySource: identityProviderServer.keySource }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter({ routerOptions: { ignoreTrailingSlash: true } }),
    );
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it('returns 404 response if authenticated user is not registered yet', async () => {
    const accessToken = await identityProviderServer.generateTokenFor({
      sub: 'external-account-id',
    });
    const getCurrentPlayer = await app.inject({
      method: 'GET',
      url: '/players/me',
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    expect(getCurrentPlayer.statusCode).toStrictEqual(404);
    expect(JSON.parse(getCurrentPlayer.body)).toStrictEqual({ message: 'Player not found' });
  });

  it('returns 201 response if player is successfully registered', async () => {
    const accessToken = await identityProviderServer.generateTokenFor({
      sub: 'external-account-id',
    });
    const registerPlayer = await app.inject({
      method: 'POST',
      url: '/players',
      body: { nickname: 'nickname' },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    expect(registerPlayer.statusCode).toStrictEqual(201);
  });

  it('returns 400 if player is registering without nickname', async () => {
    const accessToken = await identityProviderServer.generateTokenFor({
      sub: 'external-account-id',
    });
    const registerPlayer = await app.inject({
      method: 'POST',
      url: '/players',
      body: {},
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    expect(registerPlayer.statusCode).toStrictEqual(400);
    const responseBody = JSON.parse(registerPlayer.body);
    expect(responseBody.errors).toContainEqual({
      path: 'nickname',
      message: 'nickname is missing',
    });
  });

  it('returns 400 if player is registering with empty nickname', async () => {
    const accessToken = await identityProviderServer.generateTokenFor({
      sub: 'external-account-id',
    });
    const registerPlayer = await app.inject({
      method: 'POST',
      url: '/players',
      body: { nickname: '' },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    expect(registerPlayer.statusCode).toStrictEqual(400);
    const responseBody = JSON.parse(registerPlayer.body);
    expect(responseBody.errors).toContainEqual(
      expect.objectContaining({ message: 'nickname cannot be empty' }),
    );
  });

  it.each([
    { nicknameValue: 'n', nicknameLength: 1 },
    { nicknameValue: 'ni', nicknameLength: 2 },
    { nicknameValue: 'nic', nicknameLength: 3 },
    { nicknameValue: 'nick', nicknameLength: 4 },
    { nicknameValue: 'nickn', nicknameLength: 5 },
    { nicknameValue: 'nickna', nicknameLength: 6 },
    { nicknameValue: 'nicknam', nicknameLength: 7 },
  ])(
    'returns 422 if player is registering with a nickname shorter than 8 characters (current length: $nicknameLength)',
    async ({ nicknameValue }) => {
      const accessToken = await identityProviderServer.generateTokenFor({
        sub: 'external-account-id',
      });
      const registerPlayer = await app.inject({
        method: 'POST',
        url: '/players',
        body: { nickname: nicknameValue },
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      expect(registerPlayer.statusCode).toStrictEqual(422);
      expect(JSON.parse(registerPlayer.body)).toStrictEqual({
        rejectionReason: 'NICKNAME_TOO_SHORT',
      });
    },
  );

  it('returns 422 if player is registering with a nickname longer than 20 characters', async () => {
    const accessToken = await identityProviderServer.generateTokenFor({
      sub: 'external-account-id',
    });
    const registerPlayer = await app.inject({
      method: 'POST',
      url: '/players',
      body: { nickname: 'a'.repeat(21) },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    expect(registerPlayer.statusCode).toStrictEqual(422);
    expect(JSON.parse(registerPlayer.body)).toStrictEqual({
      rejectionReason: 'NICKNAME_TOO_LONG',
    });
  });

  it.each([
    { nicknameValue: 'nick1234$', forbiddenCharacter: '$' },
    { nicknameValue: 'nick1234!', forbiddenCharacter: '!' },
    { nicknameValue: 'nick1234?', forbiddenCharacter: '?' },
    { nicknameValue: 'nick1234^', forbiddenCharacter: '^' },
  ])(
    'returns 422 if player is registering with a nickname having anything but letters, digits, hyphens or underscore (current nickname contains $forbiddenCharacter)',
    async ({ nicknameValue }) => {
      const accessToken = await identityProviderServer.generateTokenFor({
        sub: 'external-account-id',
      });
      const registerPlayer = await app.inject({
        method: 'POST',
        url: '/players',
        body: { nickname: nicknameValue },
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      expect(registerPlayer.statusCode).toStrictEqual(422);
      expect(JSON.parse(registerPlayer.body)).toStrictEqual({
        rejectionReason: 'NICKNAME_FORBIDDEN_CHARACTERS',
      });
    },
  );

  it.each([{ letterCount: 0 }, { letterCount: 1 }, { letterCount: 2 }])(
    'returns 422 if player is registering with a nickname containing fewer than 3 letters (current letter count: $letterCount)',
    async ({ letterCount }) => {
      const accessToken = await identityProviderServer.generateTokenFor({
        sub: 'external-account-id',
      });
      const registerPlayer = await app.inject({
        method: 'POST',
        url: '/players',
        body: { nickname: `12345678${'a'.repeat(letterCount)}` },
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      expect(registerPlayer.statusCode).toStrictEqual(422);
      expect(JSON.parse(registerPlayer.body)).toStrictEqual({
        rejectionReason: 'NICKNAME_TOO_FEW_LETTERS',
      });
    },
  );

  it('returns 409 if player is registering with nickname already taken by another player', async () => {
    let accessToken = await identityProviderServer.generateTokenFor({
      sub: 'external-account-id',
    });
    await app.inject({
      method: 'POST',
      url: '/players',
      body: { nickname: 'nickname' },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    accessToken = await identityProviderServer.generateTokenFor({
      sub: 'external-account-id',
    });
    const registerPlayer = await app.inject({
      method: 'POST',
      url: '/players',
      body: { nickname: 'nickname' },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    expect(registerPlayer.statusCode).toStrictEqual(409);
    expect(JSON.parse(registerPlayer.body)).toStrictEqual({
      rejectionReason: 'NICKNAME_ALREADY_TAKEN',
    });
  });

  it('returns 200 with registered player if authenticated user is registered', async () => {
    const accessToken = await identityProviderServer.generateTokenFor({
      sub: 'external-account-id',
    });
    await app.inject({
      method: 'POST',
      url: '/players',
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      body: { nickname: 'nickname' },
    });

    const getCurrentPlayer = await app.inject({
      method: 'GET',
      url: '/players/me',
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    expect(getCurrentPlayer.statusCode).toStrictEqual(200);
    expect(JSON.parse(getCurrentPlayer.body)).toStrictEqual({ nickname: 'nickname' });
  });

  afterEach(async () => {
    await app.close();
  });
});
