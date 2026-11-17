import { Nickname, type Player, type PlayerRepository } from '@/player/domain';
import type { RegisterPlayerInputData } from './register-player.input-data';
import type { RegisterPlayerOutput } from './register-player-output.port';

export class RegisterPlayerUseCase {
  constructor(
    private readonly output: RegisterPlayerOutput,
    private readonly playerRepository: PlayerRepository,
  ) {}

  async execute(inputData: RegisterPlayerInputData): Promise<void> {
    const nickname = Nickname.create(inputData.nickname);
    if (nickname.status === 'FAILURE') {
      this.output.present({
        status: 'FAILURE',
        rejectionReasons: nickname.errors,
      });
      return;
    }
    const player: Player = {
      nickname: nickname.value,
    };
    const playerRegistrationResult = await this.playerRepository.register(player);
    if (playerRegistrationResult.status === 'FAILURE') {
      this.output.present({
        status: 'FAILURE',
        rejectionReasons: [playerRegistrationResult.error],
      });
      return;
    }
    this.output.present({
      status: 'SUCCESS',
      registeredPlayer: {
        nickname: player.nickname.value,
      },
    });
    return;
  }
}
