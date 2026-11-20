import type { App as VueApp } from 'vue';
import { translations } from '@/app/internationalization/translations';
import { InMemoryTranslator } from '@/player/infrastructure/internationalization/in-memory';
import {
  AuthenticationToken,
  createPlayerModule,
  PlayerModuleToken,
} from '@/player/infrastructure/vuejs';
import type { BootstrapAppDependencies } from './bootstrap-app-dependencies.interface';

export function createAppPlugin(dependencies: BootstrapAppDependencies) {
  const translator = new InMemoryTranslator(translations);
  return {
    install(app: VueApp) {
      app.use(dependencies.store);
      app.provide(AuthenticationToken, dependencies.authentication);
      app.provide(PlayerModuleToken, createPlayerModule({ translator }));
      app.use(dependencies.router);
    },
  };
}
