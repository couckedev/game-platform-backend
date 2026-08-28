import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import type { DatabaseConfig } from '../common';

export function createDrizzleClient(
  databaseConfig: DatabaseConfig,
): NodePgDatabase {
  return drizzle(databaseConfig.url);
}
