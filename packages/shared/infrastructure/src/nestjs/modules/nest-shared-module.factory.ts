import type { DynamicModule } from '@nestjs/common';
import { createSharedModule, type SharedModuleConfig } from '../../composition';
import { HealthcheckController } from '../controllers';
import { NestLogger } from '../services';
import { Logger } from '../tokens';
import { NestSharedModule } from './nest-shared.module';

export function createNestSharedModule(
  config: SharedModuleConfig,
): DynamicModule {
  const sharedModule = createSharedModule(config);

  return {
    module: NestSharedModule,
    providers: [{ provide: Logger, useValue: sharedModule.logger }, NestLogger],
    controllers: [HealthcheckController],
    exports: [Logger, NestLogger],
  };
}
