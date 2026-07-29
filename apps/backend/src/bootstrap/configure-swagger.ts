import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { playerModuleRegistry } from '@player/infrastructure/openapi';
import {
  generateOpenAPI,
  sharedModuleRegistry,
} from '@shared/infrastructure/openapi';
import type { OpenAPIV3_1 } from 'openapi-types';

export async function configureSwagger(
  app: NestFastifyApplication,
): Promise<void> {
  const document = generateOpenAPI(sharedModuleRegistry, playerModuleRegistry);

  await app.register(fastifySwagger, {
    transformObject: () => document as unknown as OpenAPIV3_1.Document,
  });

  await app.register(fastifySwaggerUi, { routePrefix: '/api' });
}
