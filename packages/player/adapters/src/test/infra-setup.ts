import { Network, GenericContainer, Wait, type WaitStrategy } from "testcontainers";
import { PostgreSqlContainer } from "@testcontainers/postgresql";
import type { StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import type { StartedNetwork } from "testcontainers";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
// src/test/ → go up to workspace root
const WORKSPACE_ROOT = path.join(__dirname, "../../../..");
const MIGRATIONS_PATH = path.join(WORKSPACE_ROOT, "infrastructure/db/migrations");

let network: StartedNetwork;
let postgresContainer: StartedPostgreSqlContainer;

export async function setup(): Promise<void> {
  network = await new Network().start();

  postgresContainer = await new PostgreSqlContainer("postgres:17-alpine")
    .withNetwork(network)
    .withNetworkAliases("database")
    .start();

  const flyway = await new GenericContainer("flyway/flyway:11-alpine")
    .withNetwork(network)
    .withEnvironment({
      FLYWAY_URL: `jdbc:postgresql://database:5432/${postgresContainer.getDatabase()}`,
      FLYWAY_USER: postgresContainer.getUsername(),
      FLYWAY_PASSWORD: postgresContainer.getPassword(),
      FLYWAY_LOCATIONS: "filesystem:/flyway/sql",
      FLYWAY_VALIDATE_ON_MIGRATE: "true",
    })
    .withBindMounts([
      {
        source: MIGRATIONS_PATH,
        target: "/flyway/sql",
        mode: "ro",
      },
    ])
    .withCommand(["migrate"])
    .withWaitStrategy(Wait.forLogMessage(/Successfully applied|is up to date/) as WaitStrategy)
    .start();

  await flyway.stop();

  process.env["TEST_DATABASE_URL"] = postgresContainer.getConnectionUri();
}

export async function teardown(): Promise<void> {
  await postgresContainer?.stop();
  await network?.stop();
}
