import type {
  AuthenticatePlayerFeature,
  RegisterPlayerFeature,
} from '../types';

export interface PlayerModule {
  registerPlayer: RegisterPlayerFeature;
  authenticatePlayer: AuthenticatePlayerFeature;
}
