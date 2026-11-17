import { RegisterPlayerUseCase } from '@/player/application/register-player';
import {
  RegisterPlayerController,
  RegisterPlayerPresenter,
  RegisterPlayerRequest,
} from '@/player/interface-adapters/register-player';
import { RegisterPlayerFeature } from './register-player-feature.type';

export const provideRegisterPlayerFeature = (): RegisterPlayerFeature => {
  const presenter = new RegisterPlayerPresenter();
  const useCase = new RegisterPlayerUseCase(presenter);
  const controller = new RegisterPlayerController(useCase);

  return (request: RegisterPlayerRequest) => {
    controller.handle(request);
    return presenter.requireViewModel();
  };
};
