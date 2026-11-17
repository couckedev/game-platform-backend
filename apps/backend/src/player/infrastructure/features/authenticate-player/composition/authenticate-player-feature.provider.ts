import { AuthenticatePlayerUseCase } from '@/player/application/authenticate-player';
import { PlayerRepository } from '@/player/domain';
import { AuthenticatedIdentity } from '@/player/infrastructure/authentication/common';
import {
  AuthenticatePlayerController,
  AuthenticatePlayerPresenter,
} from '@/player/interface-adapters/authenticate-player';
import { AuthenticatePlayerFeature } from './authenticate-player-feature.type';

export const provideAuthenticatePlayerFeature = (
  playerRepository: PlayerRepository,
): AuthenticatePlayerFeature => {
  const presenter = new AuthenticatePlayerPresenter();
  const useCase = new AuthenticatePlayerUseCase(presenter, playerRepository);
  const controller = new AuthenticatePlayerController(useCase);

  return async (request: AuthenticatedIdentity) => {
    await controller.handle(request);
    return presenter.requireViewModel();
  };
};
