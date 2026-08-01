import {
  RegisterPlayerController,
  RegisterPlayerPresenter,
  RegisterPlayerUseCase,
} from '@player/interface-adapters/features/register-player';
import type { PlayerModule } from './player-module.interface';
import type { PlayerModuleDependencies } from './player-module-dependencies.interface';

export function createPlayerModule(
  dependencies: PlayerModuleDependencies,
): PlayerModule {
  const registerPlayer = async (nickname: string) => {
    const registerPlayerPresenter = new RegisterPlayerPresenter();
    const registerPlayerUseCase = new RegisterPlayerUseCase(
      registerPlayerPresenter,
      dependencies.nicknameRegistry,
    );
    const registerPlayerController = new RegisterPlayerController(
      registerPlayerUseCase,
    );
    await registerPlayerController.handle(nickname);
    return registerPlayerPresenter.viewModel;
  };

  return { registerPlayer };
}
