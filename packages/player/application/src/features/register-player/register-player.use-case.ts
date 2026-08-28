import {
  Nickname,
  type NicknameRegistry,
  Player,
  type PlayerIdGenerator,
  type PlayerRegistrar,
} from '@player/domain';
import { isPlayerRegistrationError } from './player-registration-error.type';
import type { RegisterPlayerOutput } from './register-player-output.interface';

export class RegisterPlayerUseCase {
  constructor(
    private readonly output: RegisterPlayerOutput,
    private readonly playerRegistrar: PlayerRegistrar,
    private readonly nicknameRegistry: NicknameRegistry,
    private readonly playerIdGenerator: PlayerIdGenerator,
  ) {}

  async execute(
    nicknameValue: string,
    externalAccountId: string,
  ): Promise<void> {
    try {
      const nickname = Nickname.create(nicknameValue);
      if (await this.nicknameRegistry.isAlreadyTaken(nickname)) {
        this.output.present({
          status: 'FAILURE',
          rejectionReason: 'NICKNAME_ALREADY_TAKEN',
        });
        return;
      }
      const playerId = this.playerIdGenerator.generate();
      const player = new Player(playerId, externalAccountId, nickname);
      await this.playerRegistrar.register(player);
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
    this.output.present({ status: 'SUCCESS' });
  }
}
