import type { RegisterPlayerUseCase } from '@/player/application/features/register-player';
import type { RegisterPlayerRequest } from './register-player-request.interface';

export class RegisterPlayerController {
  constructor(private readonly useCase: RegisterPlayerUseCase) {}

  handle(request: RegisterPlayerRequest) {
    const inputData = {
      nickname: request.nickname,
    };
    this.useCase.execute(inputData);
  }
}
