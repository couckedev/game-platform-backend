import { Body, Controller, Get, Inject, Post, Res } from '@nestjs/common';
import type { FastifyReply } from 'fastify';
import {
  FastifyPlayerRegistrationView,
  type RegisterPlayerFeature,
  type RegisterPlayerRequestBody,
  registerPlayerRequestBodySchema,
} from '@/player/infrastructure/features/register-player';
import { RegisterPlayerFeatureToken } from './tokens';

@Controller('players')
export class PlayerController {
  constructor(
    @Inject(RegisterPlayerFeatureToken)
    private readonly _registerPlayer: RegisterPlayerFeature,
  ) {}

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
    const playerRegistrationViewModel = this._registerPlayer(requestBody);
    const view = new FastifyPlayerRegistrationView(response);
    view.render(playerRegistrationViewModel);
  }
}
