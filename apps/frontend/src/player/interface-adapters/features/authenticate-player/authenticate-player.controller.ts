import type { AuthenticatePlayerUseCase } from '@/player/application/features/authenticate-player';

export class AuthenticatePlayerController {
  constructor(private readonly useCase: AuthenticatePlayerUseCase) {}

  handle(): void {
    this.useCase.execute();
  }
}
