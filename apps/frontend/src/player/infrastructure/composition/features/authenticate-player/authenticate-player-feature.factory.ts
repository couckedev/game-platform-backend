import { AuthenticatePlayerUseCase } from '@/player/application/features/authenticate-player';
import {
  AuthenticatePlayerController,
  AuthenticatePlayerPresenter,
} from '@/player/interface-adapters/features/authenticate-player';
import type { AuthenticatePlayerFeature } from './authenticate-player-feature.type';
import type { AuthenticatePlayerFeatureFactoryDependencies } from './authenticate-player-feature-factory-dependencies.interface';

export function createAuthenticatePlayerFeature(
  dependencies: AuthenticatePlayerFeatureFactoryDependencies,
): AuthenticatePlayerFeature {
  const presenter = new AuthenticatePlayerPresenter();
  const useCase = new AuthenticatePlayerUseCase(presenter, dependencies.playerRepository);
  const controller = new AuthenticatePlayerController(useCase);
  return async () => {
    await controller.handle();
    return presenter.requireViewModel();
  };
}
