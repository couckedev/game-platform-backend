import type { Router } from 'vue-router';
import type { IdentityProvider } from '@/player/infrastructure/authentication/common';
import type { PlayerModule } from '@/player/infrastructure/composition';

export interface AppDependencies {
  router: Router;
  identityProvider: IdentityProvider;
  playerModule: PlayerModule;
}
