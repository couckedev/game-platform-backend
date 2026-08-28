import type { Logger } from 'winston';
import type { Logger as CommonLogger } from '../common';

export class WinstonLogger implements CommonLogger {
  constructor(private readonly logger: Logger) {}

  error(message: string, metadata?: Record<string, unknown>): void {
    this.logger.error(message, { metadata });
  }

  warning(message: string, metadata?: Record<string, unknown>): void {
    this.logger.warn(message, { metadata });
  }

  info(message: string, metadata?: Record<string, unknown>): void {
    this.logger.info(message, { metadata });
  }
}
