import { Inject, Injectable, type LoggerService } from '@nestjs/common';
import type { Logger as CommonLogger } from '../../logging/common';
import { Logger } from '../tokens';

@Injectable()
export class NestLogger implements LoggerService {
  constructor(
    @Inject(Logger)
    private readonly logger: CommonLogger,
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
