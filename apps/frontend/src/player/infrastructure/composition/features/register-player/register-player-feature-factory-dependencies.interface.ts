import type { PlayerRepository } from '@/player/domain';

export interface RegisterPlayerFeatureFactoryDependencies {
  playerRepository: PlayerRepository;
}
