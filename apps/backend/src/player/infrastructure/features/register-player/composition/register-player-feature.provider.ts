import { RegisterPlayerUseCase } from '@/player/application/register-player';
import { PlayerRepository, UniqueIdGenerator } from '@/player/domain';
import {
  RegisterPlayerController,
  RegisterPlayerPresenter,
  RegisterPlayerRequest,
} from '@/player/interface-adapters/register-player';
import { RegisterPlayerFeature } from './register-player-feature.type';

export const provideRegisterPlayerFeature = (
  playerRepository: PlayerRepository,
  uniqueIdGenerator: UniqueIdGenerator,
): RegisterPlayerFeature => {
  const presenter = new RegisterPlayerPresenter();
  const useCase = new RegisterPlayerUseCase(presenter, uniqueIdGenerator, playerRepository);
  const controller = new RegisterPlayerController(useCase);

  return async (request: RegisterPlayerRequest) => {
    await controller.handle(request);
    return presenter.requireViewModel();
  };
};
