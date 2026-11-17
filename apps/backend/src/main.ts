import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.getOrThrow<string>('PORT');

  if (configService.getOrThrow<string>('ENVIRONMENT') === 'local') {
    const frontendPort = configService.getOrThrow<string>('FRONTEND_PORT');
    app.enableCors({
      origin: `http://localhost:${frontendPort}`,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });
  }
  await app.listen(port ?? 3000);
}
await bootstrap();
