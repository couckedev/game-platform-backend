import type { Logger } from "winston";
import type { LoggerPort } from "shared-kernels-logging";

export class WinstonLoggerAdapter implements LoggerPort {
  constructor(private readonly logger: Logger) {}

  info(message: string, context?: Record<string, unknown>): void {
    this.logger.info(message, context);
  }

  warning(message: string, context?: Record<string, unknown>): void {
    this.logger.warn(message, context);
  }

  error(message: string, context?: Record<string, unknown>): void {
    this.logger.error(message, context);
  }
}
