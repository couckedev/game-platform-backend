import type { InjectionToken } from '@nestjs/common';
import type { PlayerModule as PlayerModuleType } from '../../composition';

export const PlayerModule = Symbol(
  'PlayerModule',
) as InjectionToken<PlayerModuleType>;
