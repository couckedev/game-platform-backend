import type { RegisterPlayerUseCase } from '@player/application/features/register-player';

export class RegisterPlayerController {
  constructor(private readonly useCase: RegisterPlayerUseCase) {}

  async handle(nickname: string) {
    await this.useCase.execute(nickname);
  }
}
