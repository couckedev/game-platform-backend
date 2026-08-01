import type { DatabaseClient } from '../../database/drizzle';
import type { HttpAuthenticationGuard } from '../../http/common';
import type { Logger } from '../../logging/common';

export interface SharedModule {
  httpAuthenticationGuard: HttpAuthenticationGuard;
  logger: Logger;
  databaseClient: DatabaseClient;
}
