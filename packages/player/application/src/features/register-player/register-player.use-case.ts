import { Nickname } from '@player/domain';
import { isPlayerRegistrationError } from './player-registration-error.type';
import type { RegisterPlayerOutput } from './register-player-output.interface';

export class RegisterPlayerUseCase {
  constructor(private readonly output: RegisterPlayerOutput) {}

  execute(nicknameValue: string): void {
    try {
      Nickname.create(nicknameValue);
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
