import { provideRegisterPlayerFeature } from '@/player/infrastructure/vuejs';
import type { PlayerModule } from './player-module.interface';

export function createPlayerModule(): PlayerModule {
  return {
    registerPlayer: provideRegisterPlayerFeature(),
  };
}
