import { type AxiosInstance, HttpStatusCode, isAxiosError } from 'axios';
import { Nickname, type Player, type PlayerRepository } from '@/player/domain';
import type { AccessTokenProvider } from '@/player/infrastructure/authentication/common/access-token-provider.interface';

interface PlayerRegistrationRequestBody {
  nickname: string;
}
interface CurrentPlayerFoundResponseBody {
  nickname: string;
}

type PlayerRegisteredResponseBody = Record<string, never>;

export class AxiosPlayerRepository implements PlayerRepository {
  constructor(
    private readonly playerApi: AxiosInstance,
    private readonly accessTokenProvider: AccessTokenProvider,
  ) {}

  async getCurrentPlayer() {
    try {
      const { data: getCurrentPlayerResponseBody } =
        await this.playerApi.get<CurrentPlayerFoundResponseBody>('me', {
          headers: {
            Authorization: `Bearer ${this.accessTokenProvider.requireAccessToken()}`,
          },
        });
      return {
        nickname: new Nickname(getCurrentPlayerResponseBody.nickname),
      };
    } catch (error) {
      if (isAxiosError(error) && error.status === HttpStatusCode.NotFound) {
        return null;
      }
      throw error;
    }
  }

  async register(player: Player) {
    try {
      await this.playerApi.post<
        PlayerRegisteredResponseBody,
        unknown,
        PlayerRegistrationRequestBody
      >(
        '',
        {
          nickname: player.nickname.value,
        },
        {
          headers: {
            Authorization: `Bearer ${this.accessTokenProvider.requireAccessToken()}`,
          },
        },
      );
      return { status: 'SUCCESS' as const };
    } catch (error) {
      if (isAxiosError(error) && error.status === HttpStatusCode.Conflict) {
        return { status: 'FAILURE' as const, error: 'NICKNAME_ALREADY_TAKEN' as const };
      }
      throw error;
    }
  }
}
