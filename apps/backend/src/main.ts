import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule, generateOpenAPI } from './app';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);

  await app.register(fastifySwagger, {
    transformObject: () =>
      generateOpenAPI({
        authorizationUrl: configService.getOrThrow<string>('KEYCLOAK_AUTHORIZATION_URL'),
        tokenUrl: configService.getOrThrow<string>('KEYCLOAK_TOKEN_URL'),
      }),
  });

  await app.register(fastifySwaggerUi, {
    routePrefix: '/api',
    initOAuth: {
      clientId: 'game-platform-backend-swagger',
      usePkceWithAuthorizationCodeGrant: true,
      scopes: ['openid', 'profile', 'email'],
    },
  });
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
