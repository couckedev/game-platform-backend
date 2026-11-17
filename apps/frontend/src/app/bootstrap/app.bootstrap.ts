import { createPinia } from 'pinia';
import type { App as VueApp } from 'vue';
import { createI18n } from 'vue-i18n';
import { playerrTranslations } from '@/player/infrastructure/i18n';
import { IdentityProviderToken, PlayerModuleToken } from '@/player/infrastructure/vuejs/tokens';
import { createAppRouter } from '../router';
import type { AppDependencies } from './app-dependencies.interface';

export function bootstrapApp(dependencies: AppDependencies) {
  const router = createAppRouter(dependencies.history);
  const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    missing: (locale, key) => {
      throw new Error(`Translation key ${key} for locale ${locale}`);
    },
    messages: { ...playerrTranslations },
  });

  return {
    router,
    async install(app: VueApp) {
      app.use(createPinia());
      app.use(router);
      app.use(i18n);
      app.provide(IdentityProviderToken, dependencies.identityProvider);
      app.provide(PlayerModuleToken, dependencies.playerModule);
    },
  };
}
