import type { Logger } from 'winston';
import type { Logger as CommonLogger } from '../common';

export class WinstonLogger implements CommonLogger {
  constructor(private readonly logger: Logger) {}

  error(message: string, context?: Record<string, unknown>): void {
    this.logger.error(message, context);
  }

  warning(message: string, context?: Record<string, unknown>): void {
    this.logger.warn(message, context);
  }

  info(message: string, context?: Record<string, unknown>): void {
    this.logger.info(message, context);
  }
}
