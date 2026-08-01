import type { createDrizzleClient } from './database-client.factory';

export type DatabaseClient = ReturnType<typeof createDrizzleClient>;
