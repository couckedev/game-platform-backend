import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './app/components/App.vue';
import router from './app/router/index.ts';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
