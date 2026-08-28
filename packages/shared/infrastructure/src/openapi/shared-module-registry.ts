import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

export const sharedModuleRegistry = new OpenAPIRegistry();

sharedModuleRegistry.registerPath({
  method: 'get',
  path: '/ready',
  summary: 'Readiness',
  responses: {
    200: {
      description: 'Service is healthy',
      content: {
        'application/json': {
          schema: z.object({ status: z.literal(true) }),
        },
      },
    },
    404: {
      description: 'Service is down',
    },
  },
});

sharedModuleRegistry.registerPath({
  method: 'get',
  path: '/openapi.json',
  summary: 'OpenAPI JSON file',
  responses: {
    200: {
      description: 'OpenAPI JSON document',
      content: {
        'application/json': {
          schema: z.object(),
        },
      },
    },
    404: {
      description: 'Service is down',
    },
  },
});
