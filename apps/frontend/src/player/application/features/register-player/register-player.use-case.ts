import { Nickname, type Player, type PlayerRepository } from '@/player/domain';
import type { PlayerRegistrationRejectionReason } from './player-registration-rejection-reason.type';
import type { RegisterPlayerInputData } from './register-player.input-data';
import type { RegisterPlayerOutput } from './register-player-output.port';

export class RegisterPlayerUseCase {
  constructor(
    private readonly output: RegisterPlayerOutput,
    private readonly playerRepository: PlayerRepository,
  ) {}

  execute(inputData: RegisterPlayerInputData): void {
    const playerRegistrationErrors: PlayerRegistrationRejectionReason[] = [];
    const nickname = Nickname.create(inputData.nickname);
    if (nickname.status === 'FAILURE') {
      playerRegistrationErrors.push(...nickname.errors);
      this.output.present({
        status: 'FAILURE',
        rejectionReasons: playerRegistrationErrors,
      });
      return;
    }

    const player: Player = {
      nickname: nickname.value,
    };
    this.playerRepository.register(player);
    this.output.present({
      status: 'SUCCESS',
      registeredPlayer: {
        nickname: player.nickname.value,
      },
    });
  }
}
