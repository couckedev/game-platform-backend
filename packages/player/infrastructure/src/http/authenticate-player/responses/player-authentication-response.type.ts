import type { HttpAuthenticatePlayerFoundResponse } from './authenticate-player-found-response.schema';
import type { HttpAuthenticatePlayerNotFoundResponse } from './authenticate-player-not-found-response.schema';

export type HttpPlayerAuthenticationResponse =
  | HttpAuthenticatePlayerFoundResponse
  | HttpAuthenticatePlayerNotFoundResponse;
