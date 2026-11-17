import {
  RegisterPlayerInputData,
  RegisterPlayerUseCase,
} from '@/player/application/register-player';
import { RegisterPlayerRequest } from './register-player.request';

export class RegisterPlayerController {
  constructor(private readonly useCase: RegisterPlayerUseCase) {}

  handle(request: RegisterPlayerRequest): void {
    const inputData: RegisterPlayerInputData = {
      nickname: request.nickname,
    };
    this.useCase.execute(inputData);
  }
}
