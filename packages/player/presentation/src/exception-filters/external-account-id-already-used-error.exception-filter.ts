import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { FastifyReply } from "fastify";
import { ExternalAccountIdAlreadyUsedError } from "player-domain";

@Catch(ExternalAccountIdAlreadyUsedError)
export class ExternalAccountIdAlreadyUsedErrorFilter implements ExceptionFilter {
  catch(exception: ExternalAccountIdAlreadyUsedError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const reply = ctx.getResponse<FastifyReply>();

    reply.status(HttpStatus.UNPROCESSABLE_ENTITY).send({
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      error: "Unprocessable Entity",
      message: exception.message,
      code: exception.code,
    });
  }
}
