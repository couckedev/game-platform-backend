import {
  OpenAPIRegistry,
  OpenApiGeneratorV31,
} from '@asteasolutions/zod-to-openapi';

export function generateOpenAPI(...appRegistries: OpenAPIRegistry[]) {
  const root = new OpenAPIRegistry([...appRegistries]);

  return new OpenApiGeneratorV31(root.definitions).generateDocument({
    openapi: '3.1.0',
    info: { title: 'Game Platform API', version: '1.0.0' },
    servers: [{ url: '/' }],
  });
}
