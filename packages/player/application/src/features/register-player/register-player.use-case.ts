import { Nickname, type NicknameRegistry } from '@player/domain';
import { isPlayerRegistrationError } from './player-registration-error.type';
import type { RegisterPlayerOutput } from './register-player-output.interface';

export class RegisterPlayerUseCase {
  constructor(
    private readonly output: RegisterPlayerOutput,
    private readonly registeredNicknames: NicknameRegistry,
  ) {}

  async execute(nicknameValue: string): Promise<void> {
    try {
      const nickname = Nickname.create(nicknameValue);
      if (await this.registeredNicknames.isAlreadyTaken(nickname)) {
        this.output.present({
          status: 'FAILURE',
          rejectionReason: 'NICKNAME_ALREADY_TAKEN',
        });
        return;
      }
      await this.registeredNicknames.reserve(nickname);
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
