import {
  createRouter,
  type NavigationGuard,
  type RouteRecordRaw,
  type RouterHistory,
} from 'vue-router';
import { DefaultLayout } from '@/app/layouts';
import HomePage from '@/app/pages/HomePage.vue';
import SignInPage from '@/app/pages/SignInPage.vue';
import { usePlayerStore } from '@/player/infrastructure/vuejs/stores/player-store';

const registrationRequiredGuard: NavigationGuard = (to) => {
  const playerStore = usePlayerStore();

  if (playerStore.hasSignedIn && to.name !== 'sign-in') {
    return { name: 'sign-in' };
  }
};
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
  const router = createRouter({ history, routes });
  router.beforeEach(registrationRequiredGuard);
  return router;
}
