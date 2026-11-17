import type { Authentication } from './authentication.interface';
import type { AuthenticationFactoryDependencies } from './authentication-factory-dependencies.interface';

export function createAuthentication(
  dependencies: AuthenticationFactoryDependencies,
): Authentication {
  return {
    startSignInProcess: dependencies.onSignInStarted,
    async restore() {
      await dependencies.authenticationStatusResolver.resolve();
      this.isAuthenticated = dependencies.authenticationStatusResolver.isAuthenticated;
    },
    isAuthenticated: false,
  };
}
