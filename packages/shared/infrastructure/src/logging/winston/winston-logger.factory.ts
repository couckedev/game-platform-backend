import { createLogger, transports } from 'winston';
import type { Logger, LoggerConfig } from '../common';
import { createFormat } from './winston-format.factory';
import { WinstonLogger } from './winston-logger';

export function createWinstonLogger(loggerConfig: LoggerConfig): Logger {
  const winstonLogger = createLogger({
    level: loggerConfig.level,
    transports: [new transports.Console()],
    format: createFormat(loggerConfig.format),
  });
  return new WinstonLogger(winstonLogger);
}
