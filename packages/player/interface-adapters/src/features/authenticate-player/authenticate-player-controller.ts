import type { AuthenticatePlayerUseCase } from '@player/application/features/authenticate-player';

export class AuthenticatePlayerController {
  constructor(private readonly useCase: AuthenticatePlayerUseCase) {}

  async handle(externalAccountId: string) {
    await this.useCase.execute(externalAccountId);
  }
}
