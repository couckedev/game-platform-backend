import {
  AuthenticatePlayerInputData,
  AuthenticatePlayerUseCase,
} from '@/player/application/authenticate-player';
import { AuthenticatePlayerRequest } from './authenticate-player.request';

export class AuthenticatePlayerController {
  constructor(private readonly useCase: AuthenticatePlayerUseCase) {}

  async handle(request: AuthenticatePlayerRequest) {
    const inputData: AuthenticatePlayerInputData = {
      externalAccountId: request.externalAccountId,
    };
    await this.useCase.execute(inputData);
  }
}
