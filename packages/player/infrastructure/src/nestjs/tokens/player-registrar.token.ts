import type { InjectionToken } from '@nestjs/common';
import type { PlayerRegistrar as PlayerRegistrarType } from '@player/interface-adapters';

export const PlayerRegistrar = Symbol(
  'PlayerRegistrar',
) as InjectionToken<PlayerRegistrarType>;
