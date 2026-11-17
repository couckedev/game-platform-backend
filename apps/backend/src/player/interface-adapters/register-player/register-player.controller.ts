import {
  RegisterPlayerInputData,
  RegisterPlayerUseCase,
} from '@/player/application/register-player';
import { RegisterPlayerRequest } from './register-player.request';

export class RegisterPlayerController {
  constructor(private readonly useCase: RegisterPlayerUseCase) {}

  async handle(request: RegisterPlayerRequest) {
    const inputData: RegisterPlayerInputData = {
      nickname: request.nickname,
      externalAccountId: request.externalAccountId,
    };
    await this.useCase.execute(inputData);
  }
}
