import type { App as VueApp } from 'vue';
import {
  AuthenticationToken,
  createPlayerModule,
  PlayerModuleToken,
} from '@/player/infrastructure/vuejs';
import type { BootstrapAppDependencies } from './bootstrap-app-dependencies.interface';

export function createAppPlugin(dependencies: BootstrapAppDependencies) {
  return {
    install(app: VueApp) {
      app.use(dependencies.store);
      app.provide(AuthenticationToken, dependencies.authentication);
      app.provide(PlayerModuleToken, createPlayerModule());
      app.use(dependencies.router);
    },
  };
}
