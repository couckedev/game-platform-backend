import { Nickname, NicknameAlreadyTakenError, NicknameRegistry } from '@/player/domain';
import { isPlayerRegistrationError } from './player-registration-error.type';
import { RegisterPlayerInputData } from './register-player.input-data';
import { RegisterPlayerOutput } from './register-player-output.port';

export class RegisterPlayerUseCase {
  constructor(
    private readonly output: RegisterPlayerOutput,
    private readonly nicknameRegistry: NicknameRegistry,
  ) {}

  execute(inputData: RegisterPlayerInputData) {
    try {
      const nickname = Nickname.create(inputData.nickname);
      this.nicknameRegistry.register(nickname);
      this.output.present({ status: 'SUCCESS' });
      return;
    } catch (error) {
      if (error instanceof NicknameAlreadyTakenError) {
        this.output.present({ status: 'FAILURE', reason: 'NICKNAME_ALREADY_TAKEN' });
        return;
      }
      if (isPlayerRegistrationError(error)) {
        this.output.present({ status: 'FAILURE', reason: error.reason });
        return;
      }
      throw error;
    }
  }
}
