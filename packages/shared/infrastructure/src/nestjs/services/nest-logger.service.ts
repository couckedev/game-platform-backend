import { Inject, Injectable, type LoggerService } from '@nestjs/common';
import { LOGGER } from '../injection/tokens/logger.token.js';
import type { Logger } from '../logging/common/logger.interface.js';

@Injectable()
export class NestLogger implements LoggerService {
  constructor(
    @Inject(LOGGER)
    private readonly logger: Logger,
  ) {}

  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  warn(message: string, context?: string) {
    this.logger.warning(message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, {
      trace,
      context,
    });
  }
}
