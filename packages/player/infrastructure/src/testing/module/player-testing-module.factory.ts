import { createPlayerModule, type PlayerModule } from '../../composition';
import { InMemoryNicknameRegistry } from '../../persistence/in-memory/nickname-registry';

export function createPlayerTestingModule(): PlayerModule {
  const reservedNicknames = new Set<string>();
  const nicknameRegistry = new InMemoryNicknameRegistry(reservedNicknames);

  return createPlayerModule({
    nicknameRegistry,
  });
}
