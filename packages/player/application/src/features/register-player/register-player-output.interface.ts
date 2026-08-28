import type { RegisterPlayerOutputData } from './register-player-output-data.type';

export interface RegisterPlayerOutput {
  present(outputData: RegisterPlayerOutputData): void;
}
