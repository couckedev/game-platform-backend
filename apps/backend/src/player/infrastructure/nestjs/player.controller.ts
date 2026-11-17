import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import type { FastifyReply } from 'fastify';
import {
  type RegisterPlayerRequestBody,
  registerPlayerRequestBodySchema,
} from '@/player/infrastructure/openapi';

@Controller('players')
export class PlayerController {
  @Get('me')
  getCurrentPlayer(@Res({ passthrough: true }) response: FastifyReply) {
    response.status(404).send({ message: 'Player not found' });
  }

  @Post()
  register(
    @Body()
    requestBody: RegisterPlayerRequestBody,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const requestValidation = registerPlayerRequestBodySchema.safeParse(requestBody);
    if (!requestValidation.success) {
      response.status(400).send({
        errors: requestValidation.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      });
      return;
    }
    response.status(201).send({});
  }
}
