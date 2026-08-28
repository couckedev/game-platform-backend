import {
  OpenAPIRegistry,
  OpenApiGeneratorV31,
} from '@asteasolutions/zod-to-openapi';
import type { OpenApiConfig } from './open-api-config.interface';

export function generateOpenAPI(
  registries: OpenAPIRegistry[],
  config: OpenApiConfig,
) {
  const root = new OpenAPIRegistry([...registries]);

  root.registerComponent('securitySchemes', 'keycloak', {
    type: 'oauth2',
    flows: {
      authorizationCode: {
        authorizationUrl: config.authorizationUrl,
        tokenUrl: config.tokenUrl,
        scopes: {
          openid: 'OpenID Connect',
          profile: 'Profile',
          email: 'Email',
        },
      },
    },
  });

  const document = new OpenApiGeneratorV31(root.definitions).generateDocument({
    openapi: '3.1.0',
    info: { title: 'Game Platform API', version: '1.0.0' },
    servers: [{ url: '/' }],
  });

  return document;
}
