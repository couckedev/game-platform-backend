import type { DynamicModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { createSharedModule, type SharedModuleConfig } from '../../composition';
import { SystemController } from '../controllers';
import { GlobalExceptionFilter } from '../exception-filters';
import { NestHttpAuthenticationGuard } from '../guards';
import { NestLogger } from '../services';
import { DatabaseClient, HttpAuthenticationGuard, Logger } from '../tokens';
import { NestSharedModule } from './nest-shared.module';

export function createNestSharedModule(
  config: SharedModuleConfig,
): DynamicModule {
  const sharedModule = createSharedModule(config);

  return {
    module: NestSharedModule,
    providers: [
      { provide: Logger, useValue: sharedModule.logger },
      { provide: DatabaseClient, useValue: sharedModule.databaseClient },
      NestLogger,
      {
        provide: HttpAuthenticationGuard,
        useValue: sharedModule.httpAuthenticationGuard,
      },

      NestHttpAuthenticationGuard,
      {
        provide: APP_FILTER,
        useClass: GlobalExceptionFilter,
      },
    ],
    controllers: [SystemController],
    exports: [Logger, NestLogger, DatabaseClient, HttpAuthenticationGuard],
    global: true,
  };
}
