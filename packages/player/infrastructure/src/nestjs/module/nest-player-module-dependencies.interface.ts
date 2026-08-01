import type { DatabaseClient } from '@shared/infrastructure';

export interface NestPlayerModuleDependencies {
  databaseClient: DatabaseClient;
}
