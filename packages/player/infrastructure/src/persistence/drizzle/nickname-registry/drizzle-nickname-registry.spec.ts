import {
  Nickname,
  NicknameAlreadyTakenError,
} from '@player/interface-adapters';
import { createDrizzleClient } from '@shared/infrastructure';
import { startPostgresContainer } from '@shared/infrastructure/database/testing';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { reservedNicknamesTable } from '../schemas/reserved-nicknames.schema';
import { DrizzleNicknameRegistry } from './drizzle-nickname-registry';

describe(DrizzleNicknameRegistry, () => {
  let drizzleClient: NodePgDatabase;

  beforeAll(async () => {
    const { connectionUrl } = await startPostgresContainer();
    drizzleClient = createDrizzleClient({ url: connectionUrl });
    await migrate(drizzleClient, {
      migrationsFolder: './src/persistence/drizzle/migrations',
    });
  });

  beforeEach(async () => {
    await drizzleClient.delete(reservedNicknamesTable);
  });

  it('reserve nickname on table if it does not exist', async () => {
    const nickname = Nickname.create('nickname');
    const nicknameRegistry = new DrizzleNicknameRegistry(drizzleClient);

    await nicknameRegistry.reserve(nickname);

    const hasBeenReserved = await nicknameRegistry.isAlreadyTaken(nickname);
    expect(hasBeenReserved).toBeTruthy();
  });

  it('fails to reserve nickname on table if nickname is already taken', async () => {
    const nickname = Nickname.create('nickname');
    const nicknameRegistry = new DrizzleNicknameRegistry(drizzleClient);
    await nicknameRegistry.reserve(nickname);

    const nicknameReservation = async () =>
      await nicknameRegistry.reserve(nickname);

    await expect(nicknameReservation).rejects.toThrow(
      new NicknameAlreadyTakenError(nickname.value),
    );
  });
});
