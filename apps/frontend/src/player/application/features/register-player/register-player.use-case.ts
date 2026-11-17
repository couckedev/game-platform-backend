import type { Player, PlayerRepository } from '@/player/domain';
import type { RegisterPlayerInputData } from './register-player.input-data';
import type { RegisterPlayerOutput } from './register-player-output.port';

export class RegisterPlayerUseCase {
  constructor(
    private readonly output: RegisterPlayerOutput,
    private readonly playerRepository: PlayerRepository,
  ) {}

  execute(inputData: RegisterPlayerInputData): void {
    const player: Player = {
      nickname: inputData.nickname,
    };
    this.playerRepository.register(player);
    this.output.present({
      status: 'SUCCESS',
      registeredPlayer: {
        nickname: player.nickname,
      },
    });
  }
}
