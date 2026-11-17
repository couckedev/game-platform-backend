import { createPinia } from 'pinia';
import type { App as VueApp } from 'vue';
import { createI18n } from 'vue-i18n';
import { en, type MessageSchema } from '@/app/i18n';
import { IdentityProviderToken, PlayerModuleToken } from '@/player/infrastructure/vuejs/tokens';
import type { AppDependencies } from './app-dependencies.interface';

export function bootstrapApp(dependencies: AppDependencies) {
  const i18n = createI18n<[MessageSchema], 'en'>({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    missing: (locale, key) => {
      throw new Error(`Translation key ${key} for locale ${locale}`);
    },
    messages: { en },
  });

  return {
    install(app: VueApp) {
      app.use(createPinia());
      app.use(dependencies.router);
      app.use(i18n);
      app.provide(IdentityProviderToken, dependencies.identityProvider);
      app.provide(PlayerModuleToken, dependencies.playerModule);
    },
  };
}
