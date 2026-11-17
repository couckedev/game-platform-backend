/** biome-ignore-all lint/style/noNonNullAssertion: <database config file> */
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/player/infrastructure/persistence/drizzle/schemas/index.ts',
  out: './src/player/infrastructure/persistence/drizzle/migrations',
  schemaFilter: ['player'],
  migrations: {
    schema: 'player',
    table: '__drizzle_migrations',
  },
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
