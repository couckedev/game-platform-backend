import {
  RegisterPlayerController,
  RegisterPlayerPresenter,
  RegisterPlayerUseCase,
} from '@player/interface-adapters/features/register-player';
import type { PlayerModule } from './player-module.interface';

export function createPlayerModule(): PlayerModule {
  const registerPlayer = (nickname: string) => {
    const registerPlayerPresenter = new RegisterPlayerPresenter();
    const registerPlayerUseCase = new RegisterPlayerUseCase(
      registerPlayerPresenter,
    );
    const registerPlayerController = new RegisterPlayerController(
      registerPlayerUseCase,
    );
    registerPlayerController.handle(nickname);
    return registerPlayerPresenter.viewModel;
  };

  return { registerPlayer };
}
