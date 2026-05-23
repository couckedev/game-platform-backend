import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { BusinessError } from "@couckedev/ddd-core";
import { FastifyReply } from "fastify";

@Catch(BusinessError)
export class BusinessExceptionFilter implements ExceptionFilter {
  catch(exception: BusinessError, host: ArgumentsHost): void {
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
