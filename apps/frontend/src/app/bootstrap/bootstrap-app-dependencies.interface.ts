import type { Pinia } from 'pinia';
import type { Router } from 'vue-router';
import type { Authentication } from '@/player/infrastructure/authentication/common';

export interface BootstrapAppDependencies {
  store: Pinia;
  router: Router;
  authentication: Authentication;
}
