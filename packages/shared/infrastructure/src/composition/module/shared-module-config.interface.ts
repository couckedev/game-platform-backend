import type { AuthenticationConfig } from '../../authentication/common';
import type { DatabaseConfig } from '../../database/common';
import type { LoggerConfig } from '../../logging/common';

export interface SharedModuleConfig {
  authentication: AuthenticationConfig;
  logger: LoggerConfig;
  database: DatabaseConfig;
}
