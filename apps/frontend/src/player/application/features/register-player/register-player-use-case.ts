import { NicknameValueObject } from '@/player/domain';
import type { RegisterPlayerInputData } from './register-player-input-data.interface';
import type { RegisterPlayerOutputPort } from './register-player-output-port.interface';

export class RegisterPlayerUseCase {
  constructor(private readonly outputPort: RegisterPlayerOutputPort) {}

  execute(inputData: RegisterPlayerInputData): void {
    const nicknameCreationResult = NicknameValueObject.create(inputData.nickname);
    if (nicknameCreationResult.status === 'FAILURE') {
      this.outputPort.present({
        status: 'FAILURE',
        errors: {
          nickname: nicknameCreationResult.errors,
        },
      });
      return;
    }

    this.outputPort.present({
      status: 'SUCCESS',
    });
  }
}
