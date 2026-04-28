import type { StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { Flyway } from "node-flyway";

export async function runMigrations(
  databaseContainer: StartedPostgreSqlContainer,
  migrationsPath: string,
): Promise<void> {
  const flyway = new Flyway({
    url: `jdbc:postgresql://${databaseContainer.getHost()}:${databaseContainer.getPort()}/${databaseContainer.getDatabase()}`,
    user: databaseContainer.getUsername(),
    password: databaseContainer.getPassword(),
    migrationLocations: [`filesystem:${migrationsPath}`],
  });
  const result = await flyway.migrate();
  console.log(result)
  if (!result.success) {
    throw new Error(
      `Flyway migration failed: ${result.error?.errorCode} — ${result.error?.message}`,
    );
  }
}
