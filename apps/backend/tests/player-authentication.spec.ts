import { HttpStatus } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test, type TestingModule } from '@nestjs/testing';
import { beforeEach, describe, it } from 'vitest';
import { PlayerModule } from '@/player/infrastructure';

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

    expect(getCurrentPlayer.statusCode).toStrictEqual(HttpStatus.NOT_FOUND);
    expect(JSON.parse(getCurrentPlayer.body)).toStrictEqual({ message: 'Player not found' });
  });

  afterEach(async () => {
    await app.close();
  });
});
