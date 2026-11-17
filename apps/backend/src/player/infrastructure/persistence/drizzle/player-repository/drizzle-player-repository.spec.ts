import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { beforeEach, describe, expect, it } from 'vitest';
import { Nickname, NicknameAlreadyTakenError, Player } from '@/player/domain';
import { RandomUuidGenerator } from '@/player/infrastructure/persistence/random-uuid';
import * as schema from '../schemas';
import { DrizzlePlayerRepository } from './drizzle-player-repository';

describe(DrizzlePlayerRepository.name, () => {
  let database: NodePgDatabase<typeof schema>;

  beforeEach(async () => {
    const databaseContainer = await new PostgreSqlContainer('postgres:17-alpine').start();
    database = drizzle({
      connection: {
        connectionString: databaseContainer.getConnectionUri(),
        max: 5,
      },
      schema,
    });

    await migrate(database, {
      migrationsFolder: './src/player/infrastructure/persistence/drizzle/migrations',
      migrationsSchema: 'player',
      migrationsTable: '__drizzle_migrations',
    });
  });

  it('throws error if player nickname is already taken', async () => {
    const uniqueIdGenerator = new RandomUuidGenerator();
    const player: Player = {
      externalAccountId: 'external-account-id',
      id: uniqueIdGenerator.generate(),
      nickname: new Nickname('nickname'),
    };
    const playerRepository = new DrizzlePlayerRepository(database);
    await playerRepository.register(player);
    const anotherPlayer: Player = {
      externalAccountId: 'external-account-id',
      id: uniqueIdGenerator.generate(),
      nickname: player.nickname,
    };

    const playerRegistrationAttempt = async () => await playerRepository.register(anotherPlayer);

    await expect(playerRegistrationAttempt).rejects.toBeInstanceOf(NicknameAlreadyTakenError);
  });

  it('returns found registered player', async () => {
    const uniqueIdGenerator = new RandomUuidGenerator();
    const player: Player = {
      externalAccountId: 'external-account-id',
      id: uniqueIdGenerator.generate(),
      nickname: new Nickname('nickname'),
    };
    const playerRepository = new DrizzlePlayerRepository(database);
    await playerRepository.register(player);

    const foundPlayer = await playerRepository.findByExternalAccountId(player.externalAccountId);

    expect(foundPlayer).toStrictEqual(player);
  });

  it('returns null if no registered player has been found', async () => {
    const externalAccountId = 'external-account-id';
    const playerRepository = new DrizzlePlayerRepository(database);

    const foundPlayer = await playerRepository.findByExternalAccountId(externalAccountId);

    expect(foundPlayer).toBeNull();
  });
});
