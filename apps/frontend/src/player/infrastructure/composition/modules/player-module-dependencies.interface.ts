import type { PlayerRepository } from '@/player/domain';
import type { IdentityProvider } from '../../authentication/common';

export interface PlayerModuleDependencies {
  identityProvider: IdentityProvider;
  playerRepository: PlayerRepository;
}
