import { createApp } from 'vue';
import { createWebHistory } from 'vue-router';
import { bootstrapApp } from '@/app/bootstrap';
import { App } from '@/app/components';
import {
  createKeycloakInstance,
  KeycloakIdentityProvider,
} from '@/player/infrastructure/authentication/keycloak';

const app = createApp(App);

app.use(
  bootstrapApp({
    history: createWebHistory(),
    identityProvider: new KeycloakIdentityProvider(
      createKeycloakInstance({
        url: import.meta.env.VITE_KEYCLOAK_URL,
        realm: import.meta.env.VITE_KEYCLOAK_REALM,
        clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
      }),
    ),
  }),
);
app.mount('#app');
