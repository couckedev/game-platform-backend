import type { RegisterPlayerOutputData } from './register-player-output-data.type';

export interface RegisterPlayerOutputPort {
  present(outputData: RegisterPlayerOutputData): void;
}
