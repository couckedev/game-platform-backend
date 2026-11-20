import { RegisterPlayerUseCase } from '@/player/application/features/register-player';
import {
  RegisterPlayerController,
  RegisterPlayerPresenter,
  type RegisterPlayerRequest,
} from '@/player/interface-adapters/features/register-player';
import type { RegisterPlayerFeatureDependencies } from './register-player-feature-dependencies.interface';
import type { RegisterPlayerFeature } from './register-playey-feature.type';

export function provideRegisterPlayerFeature(
  dependencies: RegisterPlayerFeatureDependencies,
): RegisterPlayerFeature {
  return (request: RegisterPlayerRequest) => {
    const presenter = new RegisterPlayerPresenter(dependencies.translator);
    const useCase = new RegisterPlayerUseCase(presenter);
    const controller = new RegisterPlayerController(useCase);
    controller.handle(request);
    return presenter.requireViewModel();
  };
}
