import type {
  RegisterPlayerInputData,
  RegisterPlayerUseCase,
} from '@/player/application/features/register-player';
import type { RegisterPlayerRequest } from './register-player.request';

export class RegisterPlayerController {
  constructor(private readonly useCase: RegisterPlayerUseCase) {}

  handle(request: RegisterPlayerRequest): Promise<void> {
    const inputData: RegisterPlayerInputData = {
      nickname: request.nickname,
    };
    return this.useCase.execute(inputData);
  }
}
