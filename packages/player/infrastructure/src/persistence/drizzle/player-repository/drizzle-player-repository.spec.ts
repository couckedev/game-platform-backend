import { Nickname, Player } from '@player/interface-adapters';
import { createDrizzleClient } from '@shared/infrastructure';
import { startPostgresContainer } from '@shared/infrastructure/database/testing';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { playersTable } from '../schemas';
import { DrizzlePlayerRepository } from './drizzle-player-repository';

describe(DrizzlePlayerRepository, () => {
  let drizzleClient: NodePgDatabase;

  beforeAll(async () => {
    const { connectionUrl } = await startPostgresContainer();
    drizzleClient = createDrizzleClient({ url: connectionUrl });
    await migrate(drizzleClient, {
      migrationsFolder: './src/persistence/drizzle/migrations',
    });
  });

  beforeEach(async () => {
    await drizzleClient.delete(playersTable);
  });

  it('returns player matching external account id', async () => {
    const player = new Player(
      'some-player-id',
      'some-external-account-id',
      Nickname.create('nickname'),
    );
    await drizzleClient.insert(playersTable).values({
      externalAccountId: player.externalAccountId,
      playerId: player.playerId,
      nickname: player.nickname.value,
    });
    const playerRepository = new DrizzlePlayerRepository(drizzleClient);

    const foundPlayer = await playerRepository.findByExternalAccountId(
      player.externalAccountId,
    );

    expect(foundPlayer).toStrictEqual(player);
  });

  it('returns null if external account id does not match a player', async () => {
    const playerRepository = new DrizzlePlayerRepository(drizzleClient);

    const foundPlayer = await playerRepository.findByExternalAccountId(
      'some-external-account-id',
    );

    expect(foundPlayer).toBeNull();
  });
});
