import type { PlayerRepository } from '@/player/domain';
import type { AuthenticatePlayerOutput } from './authenticate-player-output.port';

export class AuthenticatePlayerUseCase {
  constructor(
    private readonly output: AuthenticatePlayerOutput,
    private readonly playerRepository: PlayerRepository,
  ) {}

  execute(): void {
    const authenticatedPlayer = this.playerRepository.getCurrentPlayer();
    if (authenticatedPlayer === null) {
      this.output.present({
        status: 'NOT_FOUND',
      });
      return;
    }
    this.output.present({
      status: 'FOUND',
      authenticatedPlayer: {
        nickname: authenticatedPlayer.nickname,
      },
    });
    return;
  }
}
