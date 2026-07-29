import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

export const sharedModuleRegistry = new OpenAPIRegistry();

sharedModuleRegistry.registerPath({
  method: 'get',
  path: '/ready',
  summary: 'Healthcheck',
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
