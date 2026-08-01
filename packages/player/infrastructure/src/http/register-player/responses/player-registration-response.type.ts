import type { HttpRegisterPlayerConflictResponse } from './register-player-conflict-response.schema';
import type { HttpRegisterPlayerSuccessResponse } from './register-player-success-response.schema';
import type { HttpRegisterPlayerUnprocessableEntityResponse } from './register-player-unprocessable-entity-response.schema';

export type HttpPlayerRegistrationResponse =
  | HttpRegisterPlayerUnprocessableEntityResponse
  | HttpRegisterPlayerConflictResponse
  | HttpRegisterPlayerSuccessResponse;
