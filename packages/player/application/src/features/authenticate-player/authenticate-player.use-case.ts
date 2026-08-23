import type { PlayerRepository } from '@player/domain';
import type { AuthenticatePlayerOutput } from './authenticate-player-output.interface';

export class AuthenticatePlayerUseCase {
  constructor(
    private readonly playerRepository: PlayerRepository,
    private readonly output: AuthenticatePlayerOutput,
  ) {}

  async execute(externalAccountId: string): Promise<void> {
    const player =
      await this.playerRepository.findByExternalAccountId(externalAccountId);
    if (player === null) {
      return;
    }

    this.output.present({
      status: 'FOUND',
      nickname: player.nickname.value,
    });
  }
}
