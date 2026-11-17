import type { AuthenticatePlayerOutputData } from './authenticate-player.output-data';

export interface AuthenticatePlayerOutput {
  present(outputData: AuthenticatePlayerOutputData): void;
}
