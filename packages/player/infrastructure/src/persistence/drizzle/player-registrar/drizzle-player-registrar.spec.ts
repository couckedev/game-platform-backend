import { Nickname, Player } from '@player/interface-adapters';
import { createDrizzleClient } from '@shared/infrastructure';
import { startPostgresContainer } from '@shared/infrastructure/database/testing';
import { and, eq } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { beforeAll, describe, expect, it } from 'vitest';
import { DrizzleNicknameRegistry } from '../nickname-registry/drizzle-nickname-registry';
import { playersTable } from '../schemas';
import { DrizzlePlayerRegistrar } from './drizzle-player-registrar';

describe(DrizzlePlayerRegistrar, () => {
  let drizzleClient: NodePgDatabase;

  beforeAll(async () => {
    const { connectionUrl } = await startPostgresContainer();
    drizzleClient = createDrizzleClient({ url: connectionUrl });
    await migrate(drizzleClient, {
      migrationsFolder: './src/persistence/drizzle/migrations',
    });
  });
  it('save player and nickname in same transaction', async () => {
    const nickname = Nickname.create('nickname');
    const player = new Player('some-player-id', 'some-external-id', nickname);
    const nicknameRegistry = new DrizzleNicknameRegistry(drizzleClient);
    const playerRegistrar = new DrizzlePlayerRegistrar(drizzleClient);

    await playerRegistrar.register(player);

    const players = await drizzleClient
      .select()
      .from(playersTable)
      .where(
        and(
          eq(playersTable.playerId, player.playerId),
          eq(playersTable.externalAccountId, player.externalAccountId),
        ),
      );
    expect(nicknameRegistry.isAlreadyTaken(nickname)).toBeTruthy();
    expect(players).toContainEqual({
      externalAccountId: player.externalAccountId,
      playerId: player.playerId,
      nickname: player.nickname.value,
    });
  });
});
