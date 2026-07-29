import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import {
  httpRegisterPlayerFailureResponseBody,
  httpRegisterPlayerRequestSchema,
  httpRegisterPlayerSuccessResponseBody,
} from '../http/register-player';

export const playerModuleRegistry = new OpenAPIRegistry();

playerModuleRegistry.registerPath({
  method: 'post',
  path: '/players',
  summary: 'Register a player',
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
      description: 'Player registration failure',
      content: {
        'application/json': {
          schema: httpRegisterPlayerFailureResponseBody,
        },
      },
    },
  },
});
