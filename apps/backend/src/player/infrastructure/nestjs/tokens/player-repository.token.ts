import { InjectionToken } from '@nestjs/common';
import { PlayerRepository } from '@/player/domain';

export const PlayerRepositoryToken = Symbol(
  'PLAYER_REPOSITORY',
) as InjectionToken<PlayerRepository>;
