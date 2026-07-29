import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from '@nestjs/platform-fastify';
import type { AppConfig } from '../app/configuration';
import { createAppModule } from '../app/index.js';

export async function createApp(
  appConfig: AppConfig,
): Promise<NestFastifyApplication> {
  return NestFactory.create<NestFastifyApplication>(
    createAppModule(appConfig),
    new FastifyAdapter(),
    { bufferLogs: true },
  );
}
