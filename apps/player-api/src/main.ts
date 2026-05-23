import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app/app.module";
import { setupSwagger } from "./swagger.setup";
import { ConfigService } from "@nestjs/config";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { ValidationPipe } from "@nestjs/common";
import {
  BusinessExceptionFilter,
  UnauthorizedExceptionFilter,
  UnexpectedExceptionFilter,
} from "shared-presentation";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  app.useGlobalFilters(
    new UnexpectedExceptionFilter(),
    new BusinessExceptionFilter(),
    new UnauthorizedExceptionFilter(),
  );

  app.useGlobalPipes(new ValidationPipe());

  const config = app.get(ConfigService);
  const port = config.getOrThrow<number>("PLAYER_API_PORT");
  const host = config.getOrThrow<string>("PLAYER_API_HOST");

  setupSwagger(app, port);

  await app.listen({ port, host });
}

bootstrap();
