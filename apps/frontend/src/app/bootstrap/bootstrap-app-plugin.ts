import type { App as VueApp } from 'vue';
import type { BootstrapAppDependencies } from './bootstrap-app-dependencies.interface';

export function createAppPlugin(dependencies: BootstrapAppDependencies) {
  return {
    install(app: VueApp) {
      app.use(dependencies.router);
    },
  };
}
