import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import {
  playerFoundResponseSchema,
  playerNotFoundResponseSchema,
} from '@/player/infrastructure/features/authenticate-player';
import {
  conflictPlayerRegistrationResponseSchema,
  playerCreatedResponseSchema,
  registerPlayerRequestBodySchema,
  unprocessablePlayerRegistrationResponseSchema,
} from '@/player/infrastructure/features/register-player';
import { badRequestResponse } from './bad-request-response.schema';
import { unauthorizedResponseSchema } from './unauthorized-response.schema';

export const playerModuleRegistry = new OpenAPIRegistry();

playerModuleRegistry.registerPath({
  method: 'get',
  path: '/players/me',
  summary: 'Get current player',
  security: [{ keycloak: ['openid', 'profile', 'email'] }],
  responses: {
    200: {
      description: 'Player found',
      content: { 'application/json': { schema: playerFoundResponseSchema } },
    },
    401: {
      description: 'Missing or invalid bearer token',
      content: { 'application/json': { schema: unauthorizedResponseSchema } },
    },
    404: {
      description: 'Player not found',
      content: {
        'application/json': {
          schema: playerNotFoundResponseSchema,
        },
      },
    },
  },
});

playerModuleRegistry.registerPath({
  method: 'post',
  path: '/players',
  summary: 'Register a player',
  security: [{ keycloak: ['openid', 'profile', 'email'] }],
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
      content: { 'application/json': { schema: playerCreatedResponseSchema } },
    },
    401: {
      description: 'Missing or invalid bearer token',
      content: { 'application/json': { schema: unauthorizedResponseSchema } },
    },
    409: {
      description: 'Nickname is already taken',
      content: { 'application/json': { schema: conflictPlayerRegistrationResponseSchema } },
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
