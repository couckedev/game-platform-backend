import { describe, expect, it, beforeAll, beforeEach } from "vitest";
import { startPostgresContainer } from "shared-infrastructure";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { DRIZZLE_MIGRATION_FOLDER } from "../../src/database/drizzle.constants";
import { ExternalAccountId, Nickname, Player, PlayerId } from "player-domain";
import { Timestamp } from "shared-kernels-time";
import { playersTable } from "../../src/database/schemas/players.schema";
import { eq } from "drizzle-orm";
import { DrizzleNicknameUniquenessChecker } from "../../src/database/adapters/nickname-uniqueness-checker/drizzle-nickname-uniqueness.checker.adapter";

describe("Drizzle adapter for nickname uniqueness checker", () => {
  let database: NodePgDatabase;
  beforeAll(async () => {
    const { connectionUrl } = await startPostgresContainer();
    database = drizzle(connectionUrl);
    await migrate(database, { migrationsFolder: DRIZZLE_MIGRATION_FOLDER });
  });

  beforeEach(async () => {
    await database.delete(playersTable);
  });

  describe("isUnique", () => {
    it("should return false if nickname already exists", async () => {
      const nickname = Nickname.create("nickname");
      const externalAccountId = ExternalAccountId.create("external-account-id");
      const existingPlayer = {
        id: PlayerId.create("player-id").value,
        nickname: nickname.value,
        externalAccountId: externalAccountId.value,
        createdAt: new Date(
          Timestamp.fromISOString("2026-04-15T12:00:00Z").value,
        ),
      };
      const nicknameUniquenessChecker = new DrizzleNicknameUniquenessChecker(
        database,
      );
      await database.insert(playersTable).values(existingPlayer);

      const isNicknameUnique =
        await nicknameUniquenessChecker.isUnique(nickname);

      expect(isNicknameUnique).toBeFalsy();
    });

    it("should return true if nickname does not already exists", async () => {
      const nickname = Nickname.create("nickname");
      const nicknameUniquenessChecker = new DrizzleNicknameUniquenessChecker(
        database,
      );

      const isNicknameUnique =
        await nicknameUniquenessChecker.isUnique(nickname);

      expect(isNicknameUnique).toBeTruthy();
    });
  });
});
