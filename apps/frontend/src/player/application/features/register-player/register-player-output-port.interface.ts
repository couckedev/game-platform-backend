import type { RegisterPlayerOutputData } from './register-player-output-data.type';

export type RegisterPlayerOutputPort = {
  present(outputData: RegisterPlayerOutputData): void;
};
