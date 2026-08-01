import {
  type ArgumentsHost,
  Catch,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import {
  ATTR_EXCEPTION_MESSAGE,
  ATTR_EXCEPTION_STACKTRACE,
  ATTR_EXCEPTION_TYPE,
} from '@opentelemetry/semantic-conventions';
import type { Logger as LoggerType } from '../../logging/common';
import { Logger } from '../tokens';

@Catch()
@Injectable()
export class GlobalExceptionFilter extends BaseExceptionFilter {
  constructor(@Inject(Logger) private readonly logger: LoggerType) {
    super();
  }

  override catch(error: Error, host: ArgumentsHost) {
    if (!(error instanceof HttpException)) {
      this.logger.error('Unexpected error', {
        [ATTR_EXCEPTION_TYPE]: error.constructor.name,
        [ATTR_EXCEPTION_MESSAGE]: error.message,
        [ATTR_EXCEPTION_STACKTRACE]: error.stack,
      });
    }
    super.catch(error, host);
  }
}
