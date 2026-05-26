import { describe, expect, it, beforeAll, beforeEach } from "vitest";
import { startPostgresContainer } from "shared-infrastructure";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { DRIZZLE_MIGRATION_FOLDER } from "../../src/database/drizzle.constants";
import { ExternalAccountId, Nickname, Player, PlayerId } from "player-domain";
import { Timestamp } from "shared-kernels-time";
import { DrizzlePlayerRepository } from "../../src/database/adapters/player-repository/drizzle-player-repository.adapter";
import { playersTable } from "../../src/database/schemas/players.schema";
import { eq } from "drizzle-orm";
import { PlayerIdAlreadyUsedError } from "../../src/database/errors/player-id-already-used.error";
import { ExternalAccountIdAlreadyUsedError, NicknameAlreadyUsedError } from "player-domain";

describe("Drizzle player repository adapter", () => {
  let database: NodePgDatabase;
  beforeAll(async () => {
    const { connectionUrl } = await startPostgresContainer();
    database = drizzle(connectionUrl);
    await migrate(database, { migrationsFolder: DRIZZLE_MIGRATION_FOLDER });
  });

  beforeEach(async () => {
    await database.delete(playersTable);
  });

  describe("create", () => {
    it("should create new player on database if does not exist", async () => {
      const playerId = PlayerId.create("player-id");
      const externalAccountId = ExternalAccountId.create("external-account-id");
      const nickname = Nickname.create("nickname");
      const now = new Date().toISOString();
      const createdAt = Timestamp.fromISOString(now);
      const player = Player.register(playerId, nickname, externalAccountId, createdAt);
      const repository = new DrizzlePlayerRepository(database);

      await repository.save(player);

      const [row] = await database
        .select()
        .from(playersTable)
        .where(eq(playersTable.id, playerId.value));

      expect(row?.id).toStrictEqual(playerId.value);
      expect(row?.nickname).toStrictEqual(nickname.value);
      expect(row?.createdAt.toISOString()).toStrictEqual(
        new Date(createdAt.toString()).toISOString(),
      );
    });
    
    it("should throw error if player with same player id already exists", async () => {
      const playerId = PlayerId.create("player-id");
      const externalAccountId = ExternalAccountId.create("external-account-id");
      const nickname = Nickname.create("nickname");
      const now = new Date().toISOString();
      const createdAt = Timestamp.fromISOString(now);
      const player = Player.register(playerId, nickname, externalAccountId, createdAt);
      const repository = new DrizzlePlayerRepository(database);
      
      const existingPlayer = {
        id: playerId.value,
        nickname: 'another_nickname',
        externalAccountId: 'another-external-account-id',
        createdAt: new Date(Timestamp.fromISOString(now).value),
      }
      await database.insert(playersTable).values(existingPlayer);

      await expect(repository.save(player)).rejects.toThrow(new PlayerIdAlreadyUsedError(playerId));
    });

    it("should throw error if player with same external account id already exists", async () => {
      const playerId = PlayerId.create("player-id");
      const externalAccountId = ExternalAccountId.create("external-account-id");
      const nickname = Nickname.create("nickname");
      const now = new Date().toISOString();
      const createdAt = Timestamp.fromISOString(now);
      const player = Player.register(playerId, nickname, externalAccountId, createdAt);
      const repository = new DrizzlePlayerRepository(database);
      
      const existingPlayer = {
        id: 'another-player-id',
        nickname: 'another_nickname',
        externalAccountId: externalAccountId.value,
        createdAt: new Date(Timestamp.fromISOString(now).value),
      }
      await database.insert(playersTable).values(existingPlayer);

      await expect(repository.save(player)).rejects.toThrow(new ExternalAccountIdAlreadyUsedError());
    });

    it("should throw error if player with same nickname already exists", async () => {
      const playerId = PlayerId.create("player-id");
      const externalAccountId = ExternalAccountId.create("external-account-id");
      const nickname = Nickname.create("nickname");
      const now = new Date().toISOString();
      const createdAt = Timestamp.fromISOString(now);
      const player = Player.register(playerId, nickname, externalAccountId, createdAt);
      const repository = new DrizzlePlayerRepository(database);

      const existingPlayer = {
        id: 'another-player-id',
        nickname: nickname.value,
        externalAccountId: 'another-external-account-id',
        createdAt: new Date(Timestamp.fromISOString(now).value),
      };
      await database.insert(playersTable).values(existingPlayer);

      await expect(repository.save(player)).rejects.toThrow(new NicknameAlreadyUsedError(nickname.value));
    });
  });

  describe("load", () => {
    it("should return player if found", async () => {
      const playerId = PlayerId.create("player-id");
      const externalAccountId = ExternalAccountId.create("external-account-id");
      const nickname = Nickname.create("nickname");
      const now = new Date().toISOString();
      const createdAt = Timestamp.fromISOString(now);
      const existingPlayer = {
        id: PlayerId.create("player-id").value,
        nickname: nickname.value,
        externalAccountId: externalAccountId.value,
        createdAt: new Date(Timestamp.fromISOString(now).value),
      }
      await database.insert(playersTable).values(existingPlayer);
      const repository = new DrizzlePlayerRepository(database);

      const foundPlayer = await repository.load(playerId);

      expect(foundPlayer?.playerId.value).toStrictEqual(existingPlayer.id);
      expect(foundPlayer?.nickname.value).toStrictEqual(existingPlayer.nickname);
      expect(foundPlayer?.externalAccountId.value).toStrictEqual(existingPlayer.externalAccountId);
      expect(foundPlayer?.createdAt.equals(createdAt)).toBeTruthy();
    });
  });
});
