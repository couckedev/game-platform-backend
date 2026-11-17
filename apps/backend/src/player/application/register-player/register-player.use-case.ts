import { Nickname } from '@/player/domain';
import { isPlayerRegistrationError } from './player-registration-error.type';
import { RegisterPlayerInputData } from './register-player.input-data';
import { RegisterPlayerOutput } from './register-player-output.port';

export class RegisterPlayerUseCase {
  constructor(private readonly output: RegisterPlayerOutput) {}

  execute(inputData: RegisterPlayerInputData) {
    try {
      Nickname.create(inputData.nickname);
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
