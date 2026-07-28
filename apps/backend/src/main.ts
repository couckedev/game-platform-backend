import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { NestLogger } from '@shared/infrastructure/nestjs';
import { AppModule } from './app/modules/app.module.js';
import { setupSwagger } from './bootstrap/index.js';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      bufferLogs: true,
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableShutdownHooks();
  app.useLogger(app.get(NestLogger));
  const configService = app.get(ConfigService);
  const host = configService.getOrThrow<string>('BACKEND_HOST');
  const port = configService.getOrThrow<string>('BACKEND_PORT');
  setupSwagger(app, port);

  app.enableCors({
    origin: configService.getOrThrow<string>('ALLOWED_ORIGINS'),
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type'],
  });
  await app.listen({ port: Number(port), host });
}

void bootstrap();
