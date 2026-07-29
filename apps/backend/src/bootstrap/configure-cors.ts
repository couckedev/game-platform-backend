import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import type { AppConfig } from '../app/configuration';

export function configureCors(
  app: NestFastifyApplication,
  appConfig: AppConfig,
): void {
  app.enableCors({
    origin: appConfig.backend.allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type'],
  });
}
