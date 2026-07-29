import type { DynamicModule } from '@nestjs/common';
import { createNestPlayerModule } from '@player/infrastructure/nestjs';
import { createNestSharedModule } from '@shared/infrastructure/nestjs';
import type { AppConfig } from '../configuration';
import { AppModule } from './app.module';

export function createAppModule(config: AppConfig): DynamicModule {
  return {
    module: AppModule,
    imports: [createNestPlayerModule(), createNestSharedModule(config)],
    controllers: [],
  };
}
