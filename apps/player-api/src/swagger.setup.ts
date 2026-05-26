import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

export function setupSwagger(app: NestFastifyApplication, port: number): void {
  const config = app.get(ConfigService);

  const keycloakUrl = config.getOrThrow<string>('KEYCLOAK_URL');
  const keycloakRealm = config.getOrThrow<string>('KEYCLOAK_REALM');
  const realmBase = `${keycloakUrl}/realms/${keycloakRealm}/protocol/openid-connect`;

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Player API')
    .setVersion('1.0')
    .addBearerAuth()
    .addOAuth2({
      type: 'oauth2',
      flows: {
        authorizationCode: {
          authorizationUrl: `${realmBase}/auth`,
          tokenUrl: `${realmBase}/token`,
          scopes: { openid: 'OpenID Connect', profile: 'Profile', email: 'Email' },
        },
      },
    })
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      oauth2RedirectUrl: `http://localhost:${port}/api/oauth2-redirect.html`,
      initOAuth: {
        clientId: 'player-api-swagger',
        usePkceWithAuthorizationCodeGrant: true,
        scopes: ['openid', 'profile', 'email'],
      },
    },
  });
}
