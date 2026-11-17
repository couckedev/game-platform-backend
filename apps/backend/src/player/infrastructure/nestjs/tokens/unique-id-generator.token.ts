import { InjectionToken } from '@nestjs/common';
import { UniqueIdGenerator } from '@/player/domain';

export const UniqueIdGeneratorToken = Symbol(
  'UNIQUE_ID_GENERATOR',
) as InjectionToken<UniqueIdGenerator>;
