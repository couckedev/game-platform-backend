import { PostgreSqlContainer } from '@testcontainers/postgresql';
import type { StartedPostgresContainer } from './started-postgres-container.interface';

export async function startPostgresContainer(
  image = 'postgres:17-alpine',
): Promise<StartedPostgresContainer> {
  const container = await new PostgreSqlContainer(image).start();
  return {
    connectionUrl: container.getConnectionUri(),
    stop: () => container.stop(),
  };
}
