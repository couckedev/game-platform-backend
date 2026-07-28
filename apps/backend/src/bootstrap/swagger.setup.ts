import type { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication, port: string): void {
  const config = app.get(ConfigService);

  const issuer = config.getOrThrow<string>('KEYCLOAK_ISSUER');
  const oidcBase = `${issuer}/protocol/openid-connect`;

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Game platform backend')
    .setVersion('1.0')
    .addOAuth2(
      {
        type: 'oauth2',
        flows: {
          authorizationCode: {
            authorizationUrl: `${oidcBase}/auth`,
            tokenUrl: `${oidcBase}/token`,
            scopes: {
              openid: 'OpenID Connect',
              profile: 'Profile',
              email: 'Email',
            },
          },
        },
      },
      'keycloak',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      oauth2RedirectUrl: `http://localhost:${port}/api/oauth2-redirect.html`,
      initOAuth: {
        clientId: 'game-platform-backend-swagger',
        usePkceWithAuthorizationCodeGrant: true,
        scopes: ['openid', 'profile', 'email'],
      },
    },
  });
}
