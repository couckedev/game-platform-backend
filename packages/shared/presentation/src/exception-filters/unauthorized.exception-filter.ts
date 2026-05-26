import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, UnauthorizedException } from "@nestjs/common";
import { FastifyReply } from "fastify";

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const reply = ctx.getResponse<FastifyReply>();

    reply.status(HttpStatus.UNAUTHORIZED).send({
      statusCode: HttpStatus.UNAUTHORIZED,
      error: "Unauthorized",
      message: exception.message,
    });
  }
}
