import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { FastifyReply } from "fastify";
import { NicknameAlreadyUsedError } from "player-domain";

@Catch(NicknameAlreadyUsedError)
export class NicknameAlreadyUsedErrorFilter implements ExceptionFilter {
  catch(exception: NicknameAlreadyUsedError, host: ArgumentsHost): void {
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
