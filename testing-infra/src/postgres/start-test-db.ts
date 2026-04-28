import {
  PostgreSqlContainer,
  type StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";

export async function startTestDb(): Promise<StartedPostgreSqlContainer> {
  return new PostgreSqlContainer("postgres:16").start();
}
