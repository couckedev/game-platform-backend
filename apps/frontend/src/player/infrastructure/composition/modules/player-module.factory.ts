import { createAuthenticatePlayerFeature } from '../features/authenticate-player';
import { createRegisterPlayerFeature } from '../features/register-player';
import type { PlayerModule } from './player-module.interface';
import type { PlayerModuleDependencies } from './player-module-dependencies.interface';

export function createPlayerModule(dependencies: PlayerModuleDependencies): PlayerModule {
  return {
    registerPlayer: createRegisterPlayerFeature({
      playerRepository: dependencies.playerRepository,
    }),
    authenticatePlayer: createAuthenticatePlayerFeature({
      playerRepository: dependencies.playerRepository,
    }),
  };
}
