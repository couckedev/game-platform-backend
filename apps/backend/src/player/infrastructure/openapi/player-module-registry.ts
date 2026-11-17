import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { authenticatePlayerNotFoundResponseSchema } from './player-not-found-response.schema';

export const playerModuleRegistry = new OpenAPIRegistry();

playerModuleRegistry.registerPath({
  method: 'get',
  path: '/players/me',
  summary: 'Get current player',
  request: {},
  security: [{ keycloak: [] }],
  responses: {
    404: {
      description: 'Player not found',
      content: {
        'application/json': {
          schema: authenticatePlayerNotFoundResponseSchema,
        },
      },
    },
  },
});
