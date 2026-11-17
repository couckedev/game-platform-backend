import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import z from 'zod';
import { badRequestResponse } from './bad-request-response.schema';
import { authenticatePlayerNotFoundResponseSchema } from './player-not-found-response.schema';
import { registerPlayerRequestBodySchema } from './register-player-request-body.schema';

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
  request: {
    body: {
      content: {
        'application/json': {
          schema: registerPlayerRequestBodySchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Player registered',
      content: {
        'application/json': {
          schema: z.object({}),
        },
      },
    },
    400: {
      description: 'Bad request',
      content: {
        'application/json': {
          schema: badRequestResponse,
        },
      },
    },
  },
});
