import { createPinia } from 'pinia';
import type { App as VueApp } from 'vue';
import { IdentityProviderToken } from '@/app/tokens';
import type { BootstrapAppDependencies } from './bootstrap-app-dependencies.interface';

export function bootstrapApp(dependencies: BootstrapAppDependencies) {
  return {
    install(app: VueApp) {
      app.use(createPinia());
      app.use(dependencies.router);
      app.provide(IdentityProviderToken, dependencies.identityProvider);
    },
  };
}
