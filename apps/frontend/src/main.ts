import { createApp } from 'vue';

import { createAppPlugin } from './app/bootstrap/bootstrap-app-plugin';
import App from './app/components/App.vue';
import router from './app/router/index.ts';

const app = createApp(App);

app.use(createAppPlugin({ router }));

app.mount('#app');
