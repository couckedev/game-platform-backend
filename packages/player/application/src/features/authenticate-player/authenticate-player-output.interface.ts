import type { AuthenticatePlayerOutputData } from './authenticate-player-output-data.type';

export interface AuthenticatePlayerOutput {
  present(outputData: AuthenticatePlayerOutputData): void;
}
