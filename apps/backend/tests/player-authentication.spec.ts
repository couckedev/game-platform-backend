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
    const registerPlayer = await app.inject({ method: 'POST', url: '/players' });

    expect(registerPlayer.statusCode).toStrictEqual(201);
  });

  afterEach(async () => {
    await app.close();
  });
});
