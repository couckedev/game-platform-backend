import { InjectionToken } from '@nestjs/common';
import { AuthenticatePlayerFeature } from '@/player/infrastructure/features/authenticate-player';

export const AuthenticatePlayerFeatureToken = Symbol(
  'AUTHENTICATE_PLAYER',
) as InjectionToken<AuthenticatePlayerFeature>;
