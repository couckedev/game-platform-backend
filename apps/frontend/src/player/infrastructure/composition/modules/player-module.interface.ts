import type { AuthenticatePlayerFeature } from '../features/authenticate-player';
import type { RegisterPlayerFeature } from '../features/register-player';

export interface PlayerModule {
  registerPlayer: RegisterPlayerFeature;
  authenticatePlayer: AuthenticatePlayerFeature;
}
