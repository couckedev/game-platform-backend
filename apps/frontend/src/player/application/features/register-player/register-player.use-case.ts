import type { Player, PlayerRepository } from '@/player/domain';
import { NicknameTooShortError } from '@/player/domain/errors';
import { Nickname } from '@/player/domain/value-objects';
import type { RegisterPlayerInputData } from './register-player.input-data';
import type { RegisterPlayerOutput } from './register-player-output.port';

export class RegisterPlayerUseCase {
  constructor(
    private readonly output: RegisterPlayerOutput,
    private readonly playerRepository: PlayerRepository,
  ) {}

  execute(inputData: RegisterPlayerInputData): void {
    try {
      const player: Player = {
        nickname: Nickname.create(inputData.nickname),
      };
      this.playerRepository.register(player);
      this.output.present({
        status: 'SUCCESS',
        registeredPlayer: {
          nickname: player.nickname.value,
        },
      });
    } catch (error) {
      if (error instanceof NicknameTooShortError) {
        this.output.present({
          status: 'FAILURE',
          rejectionReason: error.reason,
        });
        return;
      }
      throw error;
    }
  }
}
