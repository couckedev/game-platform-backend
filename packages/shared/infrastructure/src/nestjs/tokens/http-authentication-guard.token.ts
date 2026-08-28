import type { InjectionToken } from '@nestjs/common';
import type { HttpAuthenticationGuard as HttpAuthenticationGuardType } from '../../http/common';

export const HttpAuthenticationGuard = Symbol(
  'HttpAuthenticationGuard',
) as InjectionToken<HttpAuthenticationGuardType>;
