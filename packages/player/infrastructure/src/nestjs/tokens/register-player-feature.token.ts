import type { InjectionToken } from '@nestjs/common';
import type { RegisterPlayerFeature as RegisterPlayerFeatureType } from '../../composition/types';

export const RegisterPlayerFeature = Symbol(
  'RegisterPlayerFeature',
) as InjectionToken<RegisterPlayerFeatureType>;
