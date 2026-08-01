import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import {
  httpRegisterPlayerConflictResponseBody,
  httpRegisterPlayerRequestSchema,
  httpRegisterPlayerSuccessResponseBody,
  httpRegisterPlayerUnprocessableEntityResponseBody,
} from '../http/register-player';

export const playerModuleRegistry = new OpenAPIRegistry();

playerModuleRegistry.registerPath({
  method: 'post',
  path: '/players',
  summary: 'Register a player',
  security: [{ keycloak: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: httpRegisterPlayerRequestSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Player registration success',
      content: {
        'application/json': {
          schema: httpRegisterPlayerSuccessResponseBody,
        },
      },
    },
    422: {
      description: 'Player registration unprocessable entity error',
      content: {
        'application/json': {
          schema: httpRegisterPlayerUnprocessableEntityResponseBody,
        },
      },
    },
    409: {
      description: 'Player registration conflict error',
      content: {
        'application/json': {
          schema: httpRegisterPlayerConflictResponseBody,
        },
      },
    },
  },
});
