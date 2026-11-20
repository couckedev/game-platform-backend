import { provideRegisterPlayerFeature } from '@/player/infrastructure/vuejs';
import type { PlayerModule } from './player-module.interface';
import type { PlayerModuleDependencies } from './player-module-dependencies.interface';

export function createPlayerModule(dependencies: PlayerModuleDependencies): PlayerModule {
  return {
    registerPlayer: provideRegisterPlayerFeature({ translator: dependencies.translator }),
  };
}
