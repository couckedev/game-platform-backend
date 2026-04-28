import type { StartedPostgreSqlContainer } from "@testcontainers/postgresql";

export async function stopTestDb(
  container: StartedPostgreSqlContainer,
): Promise<void> {
  await container.stop();
}
