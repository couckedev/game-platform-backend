import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import z from 'zod';
import { authenticatePlayerNotFoundResponseSchema } from './player-not-found-response.schema';

export const playerModuleRegistry = new OpenAPIRegistry();

playerModuleRegistry.registerPath({
  method: 'get',
  path: '/players/me',
  summary: 'Get current player',
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

playerModuleRegistry.registerPath({
  method: 'post',
  path: '/players',
  summary: 'Register a player',
  responses: {
    201: {
      description: 'Player registered',
      content: {
        'application/json': {
          schema: z.object({}),
        },
      },
    },
  },
});
