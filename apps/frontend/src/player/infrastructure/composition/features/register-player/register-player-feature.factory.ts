import { RegisterPlayerUseCase } from '@/player/application/features/register-player';
import {
  RegisterPlayerController,
  RegisterPlayerPresenter,
  type RegisterPlayerRequest,
} from '@/player/interface-adapters/features/register-player';
import type { RegisterPlayerFeature } from './register-player-feature.type';
import type { RegisterPlayerFeatureFactoryDependencies } from './register-player-feature-factory-dependencies.interface';

export function createRegisterPlayerFeature(
  dependencies: RegisterPlayerFeatureFactoryDependencies,
): RegisterPlayerFeature {
  const presenter = new RegisterPlayerPresenter();
  const useCase = new RegisterPlayerUseCase(presenter, dependencies.playerRepository);
  const controller = new RegisterPlayerController(useCase);

  return async (request: RegisterPlayerRequest) => {
    await controller.handle(request);
    return presenter.requireViewModel();
  };
}
