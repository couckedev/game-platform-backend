import { Nickname, type Player, type PlayerRepository } from '@/player/domain';
import { isPlayerRegistrationError } from './player-registration-error.type';
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
      if (isPlayerRegistrationError(error)) {
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
