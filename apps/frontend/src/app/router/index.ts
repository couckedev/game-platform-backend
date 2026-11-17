import { createRouter, type RouteRecordRaw, type RouterHistory } from 'vue-router';
import { DefaultLayout } from '../layouts';
import HomePage from '../pages/HomePage.vue';
import SignInPage from '../pages/SignInPage.vue';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', name: 'home', component: async () => HomePage },
      { path: 'sign-in', name: 'sign-in', component: async () => SignInPage },
    ],
  },
];

export function createAppRouter(history: RouterHistory) {
  return createRouter({ history, routes });
}
