import type { RouterHistory } from 'vue-router';
import type { IdentityProvider } from '@/player/infrastructure/authentication/common';
import type { PlayerModule } from '@/player/infrastructure/composition';

export interface AppDependencies {
  history: RouterHistory;
  identityProvider: IdentityProvider;
  playerModule: PlayerModule;
}
