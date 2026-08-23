import type { InjectionToken } from '@nestjs/common';
import type { PlayerRepository as PlayerRepositoryType } from '@player/interface-adapters';

export const PlayerRepository = Symbol(
  'PlayerRepository',
) as InjectionToken<PlayerRepositoryType>;
