import { RegisterPlayerOutputData } from './register-player.output-data';

export interface RegisterPlayerOutput {
  present(outputData: RegisterPlayerOutputData): void;
}
