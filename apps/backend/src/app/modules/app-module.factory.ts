import type { DynamicModule } from '@nestjs/common';
import { createNestPlayerModule } from '@player/infrastructure/nestjs';
import { createNestSharedModule } from '@shared/infrastructure/nestjs';
import type { AppConfig } from '../configuration';
import { OpenAPIController } from '../controllers/openapi.controller';
import { OpenAPIDocumentProvider } from '../services';
import { AppModule } from './app.module';

export function createAppModule(config: AppConfig): DynamicModule {
  return {
    module: AppModule,
    providers: [
      {
        provide: OpenAPIDocumentProvider,
        useValue: new OpenAPIDocumentProvider(config),
      },
    ],
    imports: [createNestSharedModule(config), createNestPlayerModule()],
    controllers: [OpenAPIController],
  };
}
