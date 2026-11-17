import { InjectionToken } from '@nestjs/common';
import { RegisterPlayerFeature } from '@/player/infrastructure/features/register-player';

export const RegisterPlayerFeatureToken = Symbol(
  'REGISTER_PLAYER_FEATURE',
) as InjectionToken<RegisterPlayerFeature>;
