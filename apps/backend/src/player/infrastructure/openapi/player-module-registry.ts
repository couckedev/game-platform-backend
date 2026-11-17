import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import z from 'zod';
import { registerPlayerRequestBodySchema } from '@/player/infrastructure/features/register-player';
import { badRequestResponse } from './bad-request-response.schema';
import { authenticatePlayerNotFoundResponseSchema } from './player-not-found-response.schema';
import { unprocessablePlayerRegistrationResponseSchema } from './unprocessable-player-registration-response.schema';

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
    422: {
      description: 'Unprocessable entity',
      content: {
        'application/json': {
          schema: unprocessablePlayerRegistrationResponseSchema,
        },
      },
    },
  },
});
