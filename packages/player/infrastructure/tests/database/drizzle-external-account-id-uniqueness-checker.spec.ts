import { describe, expect, it, beforeAll, beforeEach } from "vitest";
import { startPostgresContainer } from "shared-infrastructure";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { DRIZZLE_MIGRATION_FOLDER } from "../../src/database/drizzle.constants";
import { ExternalAccountId, Nickname, PlayerId } from "player-domain";
import { Timestamp } from "shared-kernels-time";
import { playersTable } from "../../src/database/schemas/players.schema";
import { DrizzleExternalAccountIdUniquenessChecker } from "../../src/database/adapters/external-account-id-uniqueness-checker/drizzle-external-account-id-uniqueness.checker.adapter";

describe("Drizzle adapter for external account id uniqueness checker", () => {
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
    it("should return false if external account id already exists", async () => {
      const externalAccountId = ExternalAccountId.create("external-account-id");
      const existingPlayer = {
        id: PlayerId.create("player-id").value,
        nickname: Nickname.create("nickname").value,
        externalAccountId: externalAccountId.value,
        createdAt: new Date(
          Timestamp.fromISOString("2026-04-15T12:00:00Z").value,
        ),
      };
      const checker = new DrizzleExternalAccountIdUniquenessChecker(database);
      await database.insert(playersTable).values(existingPlayer);

      const isUnique = await checker.isUnique(externalAccountId);

      expect(isUnique).toBeFalsy();
    });

    it("should return true if external account id does not already exist", async () => {
      const externalAccountId = ExternalAccountId.create("external-account-id");
      const checker = new DrizzleExternalAccountIdUniquenessChecker(database);

      const isUnique = await checker.isUnique(externalAccountId);

      expect(isUnique).toBeTruthy();
    });
  });
});
