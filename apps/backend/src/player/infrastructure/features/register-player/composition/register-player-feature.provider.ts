import { RegisterPlayerUseCase } from '@/player/application/register-player';
import { NicknameRegistry } from '@/player/domain';
import {
  RegisterPlayerController,
  RegisterPlayerPresenter,
  RegisterPlayerRequest,
} from '@/player/interface-adapters/register-player';
import { RegisterPlayerFeature } from './register-player-feature.type';

export const provideRegisterPlayerFeature = (
  nicknameRegistry: NicknameRegistry,
): RegisterPlayerFeature => {
  const presenter = new RegisterPlayerPresenter();
  const useCase = new RegisterPlayerUseCase(presenter, nicknameRegistry);
  const controller = new RegisterPlayerController(useCase);

  return (request: RegisterPlayerRequest) => {
    controller.handle(request);
    return presenter.requireViewModel();
  };
};
