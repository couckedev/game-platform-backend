import type { RegisterPlayerUseCase } from '@player/application/features/register-player';

export class RegisterPlayerController {
  constructor(private readonly useCase: RegisterPlayerUseCase) {}

  handle(nickname: string) {
    this.useCase.execute(nickname);
  }
}
