import { createApp } from 'vue';
import { createWebHistory } from 'vue-router';
import { bootstrapApp } from '@/app/bootstrap';
import { App } from '@/app/components';
import { createAppRouter } from '@/app/router';
import { createKeycloakAuthentication } from '@/player/infrastructure/authentication/keycloak';
import { createPlayerModule } from '@/player/infrastructure/composition';
import { createAxiosPlayerRepository } from '@/player/infrastructure/persistence/axios';

const app = createApp(App);

const authentication = await createKeycloakAuthentication({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
});

app.use(
  bootstrapApp({
    router: createAppRouter(createWebHistory(import.meta.env.BASE_URL)),
    identityProvider: authentication.identityProvider,
    playerModule: createPlayerModule({
      identityProvider: authentication.identityProvider,
      playerRepository: createAxiosPlayerRepository(
        import.meta.env.VITE_PLAYER_API_BASE_URL,
        authentication.accessTokenProvider,
      ),
    }),
  }),
);
app.mount('#app');
