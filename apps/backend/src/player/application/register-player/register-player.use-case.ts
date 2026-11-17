import { Nickname, NicknameTooShortError } from '@/player/domain';
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
      if (error instanceof NicknameTooShortError) {
        this.output.present({ status: 'FAILURE', reason: 'NICKNAME_TOO_SHORT' });
        return;
      }
      throw error;
    }
  }
}
