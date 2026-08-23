import type { InjectionToken } from '@nestjs/common';
import type { AuthenticatePlayerFeature as AuthenticatePlayerFeatureType } from '../../composition';

export const AuthenticatePlayerFeature = Symbol(
  'AuthenticatePlayerFeature',
) as InjectionToken<AuthenticatePlayerFeatureType>;
