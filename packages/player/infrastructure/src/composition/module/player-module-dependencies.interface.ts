import type {
  NicknameRegistry,
  PlayerIdGenerator,
  PlayerRegistrar,
  PlayerRepository,
} from '@player/interface-adapters';

export interface PlayerModuleDependencies {
  nicknameRegistry: NicknameRegistry;
  playerRegistrar: PlayerRegistrar;
  playerIdGenerator: PlayerIdGenerator;
  playerRepository: PlayerRepository;
}
