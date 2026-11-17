import type { PlayerRepository } from '@/player/domain';

export interface AuthenticatePlayerFeatureFactoryDependencies {
  playerRepository: PlayerRepository;
}
