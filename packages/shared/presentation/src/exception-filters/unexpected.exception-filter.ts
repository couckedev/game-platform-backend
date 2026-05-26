import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from "@nestjs/common";
import { FastifyReply } from "fastify";

@Catch(Error)
export class UnexpectedExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(UnexpectedExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const reply = ctx.getResponse<FastifyReply>();

    this.logger.error(exception.message, exception.stack);

    reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: "Internal Server Error",
      message: "An unexpected error occurred",
    });
  }
}
