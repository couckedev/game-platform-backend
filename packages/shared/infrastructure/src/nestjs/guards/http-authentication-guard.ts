import {
  type CanActivate,
  type ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ATTR_EXCEPTION_MESSAGE,
  ATTR_EXCEPTION_STACKTRACE,
  ATTR_EXCEPTION_TYPE,
} from '@opentelemetry/semantic-conventions';
import {
  type HttpAuthenticationGuard as HttpAuthenticationGuardType,
  HttpAuthorizationError,
} from '../../http/common';
import type { Logger as LoggerType } from '../../logging/common';
import { HttpAuthenticationGuard, Logger } from '../tokens';

@Injectable()
export class NestHttpAuthenticationGuard implements CanActivate {
  constructor(
    @Inject(HttpAuthenticationGuard)
    private readonly httpAuthenticationGuard: HttpAuthenticationGuardType,
    @Inject(Logger) private readonly logger: LoggerType,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const authorizationHeader: string = request.headers.authorization;

      await this.httpAuthenticationGuard.authenticate(authorizationHeader);

      return true;
    } catch (error) {
      if (error instanceof HttpAuthorizationError) {
        this.logger.error('Authorization failed', {
          [ATTR_EXCEPTION_TYPE]: error.constructor.name,
          [ATTR_EXCEPTION_MESSAGE]: error.message,
          [ATTR_EXCEPTION_STACKTRACE]: error.stack,
          cause: error.cause,
        });
        throw new UnauthorizedException('Autorization failed');
      }
      throw error;
    }
  }
}
