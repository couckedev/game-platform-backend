import { createWinstonLogger } from '../../logging/winston';
import type { SharedModule } from './shared-module.interface';
import type { SharedModuleConfig } from './shared-module-config.interface';

export function createSharedModule(config: SharedModuleConfig): SharedModule {
  return {
    logger: createWinstonLogger(config.loggerConfig),
  };
}
