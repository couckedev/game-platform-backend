import { Nickname, Player, PlayerRepository, UniqueIdGenerator } from '@/player/domain';
import { isPlayerRegistrationError } from './player-registration-error.type';
import { RegisterPlayerInputData } from './register-player.input-data';
import { RegisterPlayerOutput } from './register-player-output.port';

export class RegisterPlayerUseCase {
  constructor(
    private readonly output: RegisterPlayerOutput,
    private readonly uniqueIdGenerator: UniqueIdGenerator,
    private readonly playerRepository: PlayerRepository,
  ) {}

  async execute(inputData: RegisterPlayerInputData) {
    try {
      const nickname = Nickname.create(inputData.nickname);
      const player: Player = {
        id: this.uniqueIdGenerator.generate(),
        externalAccountId: inputData.externalAccountId,
        nickname,
      };
      await this.playerRepository.register(player);
      this.output.present({ status: 'SUCCESS' });
      return;
    } catch (error) {
      if (isPlayerRegistrationError(error)) {
        this.output.present({ status: 'FAILURE', reason: error.reason });
        return;
      }
      throw error;
    }
  }
}
