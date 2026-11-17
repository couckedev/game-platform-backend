import { createPinia } from 'pinia';
import type { App as VueApp } from 'vue';
import { createAppRouter } from '../router';
import { IdentityProviderToken, PlayerModuleToken } from '../tokens';
import type { AppDependencies } from './app-dependencies.interface';

export function bootstrapApp(dependencies: AppDependencies) {
  const router = createAppRouter(dependencies.history);

  return {
    router,
    async install(app: VueApp) {
      app.use(createPinia());
      app.use(router);
      app.provide(IdentityProviderToken, dependencies.identityProvider);
      app.provide(PlayerModuleToken, dependencies.playerModule);
    },
  };
}
