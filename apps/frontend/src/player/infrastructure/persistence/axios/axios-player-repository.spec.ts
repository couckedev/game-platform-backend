import axios, { HttpStatusCode } from 'axios';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { Nickname, type Player } from '@/player/domain';
import { InMemoryAccessTokenProvider } from '@/player/infrastructure/authentication/in-memory';
import { AxiosPlayerRepository } from './axios-player-repository';

interface CurrentPlayerFoundResponseBody {
  nickname: string;
}

type PlayerRegisteredResponseBody = Record<string, never>;

describe(AxiosPlayerRepository.name, () => {
  const PLAYER_API_URL = 'http://localhost:3000/api/players';
  const playerApi = axios.create({ baseURL: PLAYER_API_URL });

  const server = setupServer();
  beforeAll(() => server.listen({ onUnhandledFrame: 'error' }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe('get current player', () => {
    it('returns current player if player is found', async () => {
      server.use(
        http.get<CurrentPlayerFoundResponseBody>(`${PLAYER_API_URL}/me`, () =>
          HttpResponse.json(
            {
              nickname: 'nickname',
            },
            { status: HttpStatusCode.Ok },
          ),
        ),
      );
      const playerRepository = new AxiosPlayerRepository(
        playerApi,
        new InMemoryAccessTokenProvider('token'),
      );

      const currentPlayer = await playerRepository.getCurrentPlayer();

      expect(currentPlayer).toStrictEqual({
        nickname: new Nickname('nickname'),
      });
    });

    it('returns null if player is not found', async () => {
      server.use(
        http.get<CurrentPlayerFoundResponseBody>(`${PLAYER_API_URL}/me`, () =>
          HttpResponse.json(
            {},
            {
              status: HttpStatusCode.NotFound,
            },
          ),
        ),
      );
      const playerRepository = new AxiosPlayerRepository(
        playerApi,
        new InMemoryAccessTokenProvider('token'),
      );

      const currentPlayer = await playerRepository.getCurrentPlayer();

      expect(currentPlayer).toBeNull();
    });
  });

  describe('register', () => {
    it('returns successful registration result if player has been registered', async () => {
      server.use(
        http.post<PlayerRegisteredResponseBody>(PLAYER_API_URL, () =>
          HttpResponse.json(
            {},
            {
              status: HttpStatusCode.Created,
            },
          ),
        ),
      );
      const playerRepository = new AxiosPlayerRepository(
        playerApi,
        new InMemoryAccessTokenProvider('token'),
      );
      const player: Player = {
        nickname: new Nickname('nickname'),
      };

      const playerRegistrationResult = await playerRepository.register(player);

      expect(playerRegistrationResult).toStrictEqual({ status: 'SUCCESS' });
    });

    it('returns failed registration result if nickname is already taken', async () => {
      server.use(
        http.post<PlayerRegisteredResponseBody>(PLAYER_API_URL, () =>
          HttpResponse.json(
            {},
            {
              status: HttpStatusCode.Conflict,
            },
          ),
        ),
      );
      const playerRepository = new AxiosPlayerRepository(
        playerApi,
        new InMemoryAccessTokenProvider('token'),
      );
      const player: Player = {
        nickname: new Nickname('nickname'),
      };

      const playerRegistrationResult = await playerRepository.register(player);

      expect(playerRegistrationResult).toStrictEqual({
        status: 'FAILURE',
        error: 'NICKNAME_ALREADY_TAKEN',
      });
    });
  });
});
