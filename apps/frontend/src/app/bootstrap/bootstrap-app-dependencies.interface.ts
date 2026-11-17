import type { Router } from 'vue-router';
import type { IdentityProvider } from '@/app/authentication/common';

export interface BootstrapAppDependencies {
  router: Router;
  identityProvider: IdentityProvider;
}
