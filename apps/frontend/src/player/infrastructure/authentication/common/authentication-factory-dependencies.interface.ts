import type { AuthenticationStatusResolver } from './authentication-status-resolver.interface';

export interface AuthenticationFactoryDependencies {
  authenticationStatusResolver: AuthenticationStatusResolver;
  onSignInStarted(): Promise<void>;
}
