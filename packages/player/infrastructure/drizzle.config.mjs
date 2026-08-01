import { defineConfig } from 'drizzle-kit';

// biome-ignore lint/complexity/useLiteralKeys: conflict with typescript rule which does not allow to use process.env.DATABASE_URL
const databaseUrl = process.env['DATABASE_URL'];

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined');
}

export default defineConfig({
  schema: './src/persistence/drizzle/schemas/index.ts',
  out: './src/persistence/drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: databaseUrl,
  },
});
