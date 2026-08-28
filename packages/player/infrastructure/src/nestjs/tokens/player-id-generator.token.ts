import type { InjectionToken } from '@nestjs/common';
import type { PlayerIdGenerator as PlayerIdGeneratorType } from '@player/interface-adapters';

export const PlayerIdGenerator = Symbol(
  'PlayerIdGenerator',
) as InjectionToken<PlayerIdGeneratorType>;
