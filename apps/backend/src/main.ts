import { NestLogger } from '@shared/infrastructure/nestjs';
import { parseAppConfig } from './app/configuration';
import { configureCors, configureGlobalPipes, createApp } from './bootstrap';

async function bootstrap(): Promise<void> {
  const appConfig = parseAppConfig(process.env);
  const app = await createApp(appConfig);

  configureGlobalPipes(app);
  app.enableShutdownHooks();
  app.useLogger(app.get(NestLogger));

  configureCors(app, appConfig);

  await app.listen({
    port: Number(appConfig.backend.port),
    host: appConfig.backend.host,
  });
}

void bootstrap();
