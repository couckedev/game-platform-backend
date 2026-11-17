import { OpenAPIRegistry, OpenApiGeneratorV31 } from '@asteasolutions/zod-to-openapi';
import type { OpenAPIV3_1 } from 'openapi-types';
import { playerModuleRegistry } from '@/player/infrastructure';

interface OpenApiConfig {
  authorizationUrl: string;
  tokenUrl: string;
}

export function generateOpenAPI(config: OpenApiConfig): OpenAPIV3_1.Document {
  const root = new OpenAPIRegistry([playerModuleRegistry]);

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

  return document as OpenAPIV3_1.Document;
}
