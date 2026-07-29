import type { HttpRegisterPlayerFailureResponse } from './register-player-failure-response.schema';
import type { HttpRegisterPlayerSuccessResponse } from './register-player-success-response.schema';

export type HttpPlayerRegistrationResponse =
  | HttpRegisterPlayerFailureResponse
  | HttpRegisterPlayerSuccessResponse;
