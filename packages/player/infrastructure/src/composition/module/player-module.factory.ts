import {
  AuthenticatePlayerController,
  AuthenticatePlayerPresenter,
  AuthenticatePlayerUseCase,
} from '@player/interface-adapters/features/authenticate-player';
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
  const registerPlayer = async (
    nickname: string,
    externalAccountId: string,
  ) => {
    const registerPlayerPresenter = new RegisterPlayerPresenter();
    const registerPlayerUseCase = new RegisterPlayerUseCase(
      registerPlayerPresenter,
      dependencies.playerRegistrar,
      dependencies.nicknameRegistry,
      dependencies.playerIdGenerator,
    );
    const registerPlayerController = new RegisterPlayerController(
      registerPlayerUseCase,
    );
    await registerPlayerController.handle(nickname, externalAccountId);
    return registerPlayerPresenter.viewModel;
  };

  const authenticatePlayer = async (externalAccountId: string) => {
    const authenticatePlayerPresenter = new AuthenticatePlayerPresenter();
    const authenticatePlayerUseCase = new AuthenticatePlayerUseCase(
      dependencies.playerRepository,
      authenticatePlayerPresenter,
    );
    const authenticatePlayerController = new AuthenticatePlayerController(
      authenticatePlayerUseCase,
    );
    await authenticatePlayerController.handle(externalAccountId);
    return authenticatePlayerPresenter.viewModel;
  };

  return { registerPlayer, authenticatePlayer };
}
