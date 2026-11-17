import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test, type TestingModule } from '@nestjs/testing';
import { beforeEach, describe, it } from 'vitest';
import { PlayerModule } from '@/player/infrastructure/nestjs';

describe('Player authentication', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PlayerModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter({ routerOptions: { ignoreTrailingSlash: true } }),
    );
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it('returns 404 response if authenticated user is not registered yet', async () => {
    const getCurrentPlayer = await app.inject({ method: 'GET', url: '/players/me' });

    expect(getCurrentPlayer.statusCode).toStrictEqual(404);
    expect(JSON.parse(getCurrentPlayer.body)).toStrictEqual({ message: 'Player not found' });
  });

  it('returns 201 response if player is successfully registered', async () => {
    const registerPlayer = await app.inject({
      method: 'POST',
      url: '/players',
      body: { nickname: 'nickname' },
    });

    expect(registerPlayer.statusCode).toStrictEqual(201);
  });

  it('returns 400 if player is registering without nickname', async () => {
    const registerPlayer = await app.inject({
      method: 'POST',
      url: '/players',
      body: {},
    });

    expect(registerPlayer.statusCode).toStrictEqual(400);
    const responseBody = JSON.parse(registerPlayer.body);
    expect(responseBody.errors).toContainEqual({
      path: 'nickname',
      message: 'nickname is missing',
    });
  });

  it('returns 400 if player is registering with empty nickname', async () => {
    const registerPlayer = await app.inject({
      method: 'POST',
      url: '/players',
      body: { nickname: '' },
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
      const registerPlayer = await app.inject({
        method: 'POST',
        url: '/players',
        body: { nickname: nicknameValue },
      });

      expect(registerPlayer.statusCode).toStrictEqual(422);
      expect(JSON.parse(registerPlayer.body)).toStrictEqual({
        rejectionReason: 'NICKNAME_TOO_SHORT',
      });
    },
  );

  it('returns 422 if player is registering with a nickname longer than 20 characters', async () => {
    const registerPlayer = await app.inject({
      method: 'POST',
      url: PLAYER_API_URL,
      body: { nickname: 'a'.repeat(21) },
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
      const registerPlayer = await app.inject({
        method: 'POST',
        url: PLAYER_API_URL,
        body: { nickname: nicknameValue },
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
      const registerPlayer = await app.inject({
        method: 'POST',
        url: PLAYER_API_URL,
        body: { nickname: `12345678${'a'.repeat(letterCount)}` },
      });

      expect(registerPlayer.statusCode).toStrictEqual(422);
      expect(JSON.parse(registerPlayer.body)).toStrictEqual({
        rejectionReason: 'NICKNAME_TOO_FEW_LETTERS',
      });
    },
  );

  afterEach(async () => {
    await app.close();
  });
});
