import { PlayerRepository } from '@/player/domain';
import { AuthenticatePlayerInputData } from './authenticate-player.input-data';
import { AuthenticatePlayerOutput } from './authenticate-player-output.port';

export class AuthenticatePlayerUseCase {
  constructor(
    private readonly output: AuthenticatePlayerOutput,
    private readonly playerRepository: PlayerRepository,
  ) {}

  async execute(inputData: AuthenticatePlayerInputData) {
    const currentPlayer = await this.playerRepository.findByExternalAccountId(
      inputData.externalAccountId,
    );
    if (currentPlayer === null) {
      this.output.present({ status: 'NOT_FOUND' });
      return;
    }
    this.output.present({
      status: 'FOUND',
      currentPlayer: {
        nickname: currentPlayer.nickname.value,
      },
    });
    return;
  }
}
