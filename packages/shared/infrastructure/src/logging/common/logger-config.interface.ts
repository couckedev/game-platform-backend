import type { LogFormat } from './log-format.type';
import type { LogLevel } from './log-level.type';
import type { LogOutput } from './log-output.type';

export interface LoggerConfig {
  level: LogLevel;
  format: LogFormat;
  output: LogOutput;
}
