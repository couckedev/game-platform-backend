import type { Player } from '@player/interface-adapters';
import { createPlayerModule, type PlayerModule } from '../../composition';
import { InMemoryNicknameRegistry } from '../../persistence/in-memory/nickname-registry';
import { InMemoryPlayerIdGenerator } from '../../persistence/in-memory/player-id-generator';
import { InMemoryPlayerRegistrar } from '../../persistence/in-memory/player-registrar';
import { InMemoryPlayerRepository } from '../../persistence/in-memory/player-repository';

export function createPlayerTestingModule(): PlayerModule {
  const reservedNicknames = new Set<string>();
  const players = new Map<string, Player>();
  const nicknameRegistry = new InMemoryNicknameRegistry(reservedNicknames);
  const playerIdGenerator = new InMemoryPlayerIdGenerator();
  playerIdGenerator.playerId = 'generated-player-id';

  const playerRegistrar = new InMemoryPlayerRegistrar(
    reservedNicknames,
    players,
  );
  const playerRepository = new InMemoryPlayerRepository(players);

  return createPlayerModule({
    nicknameRegistry,
    playerIdGenerator,
    playerRegistrar,
    playerRepository,
  });
}
