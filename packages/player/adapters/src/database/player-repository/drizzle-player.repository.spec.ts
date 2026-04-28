import { Nickname, Player, PlayerId } from "player-domain";
import { test, describe, expect, it } from "vitest";
import { Timestamp } from "shared-time";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { DrizzlePlayerRepository } from "./drizzle-player.repository";
import { playersTable } from "../schemas/players.schema";
import { runMigrations, startTestDb } from 'testing-infra';

describe("Drizzle adapter for player repository", () => {
  let pool: Pool;
  let repository: DrizzlePlayerRepository;
  let db: NodePgDatabase;

  test.beforeAll(async () => {
    if(!process.env['DATABASE_MIGRATIONS_PATH']) {
        throw new Error('DATABASE_MIGRATIONS_PATH must be set in .env');
    }
    const testDatabaseContainer = await startTestDb();
    await runMigrations(testDatabaseContainer, process.env['DATABASE_MIGRATIONS_PATH']);
    pool = new Pool({ connectionString: testDatabaseContainer.getConnectionUri() });
    db = drizzle({ client: pool });
    repository = new DrizzlePlayerRepository(db);
  });

  test.afterEach(async () => {
    await db.delete(playersTable);
  });

  test.afterAll(async () => {
    await pool.end();
  });

  it("should save and retrieve a player", async () => {
    const playerId = PlayerId.create("player-id");
    const nickname = Nickname.create("nickname");
    const createdAt = Timestamp.fromISOString("2026-04-15T12:00:00Z");
    const player = Player.register(playerId, nickname, createdAt);

    await repository.save(player);
    const loaded = await repository.load(playerId);

    expect(loaded).toEqual(player);
  });
});
