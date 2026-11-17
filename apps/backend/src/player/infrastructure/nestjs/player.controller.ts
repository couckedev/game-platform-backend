import { Body, Controller, Get, Inject, Post, Res, UseGuards } from '@nestjs/common';
import type { FastifyReply } from 'fastify';
import type { AuthenticatedIdentity } from '@/player/infrastructure/authentication/common';
import {
  type AuthenticatePlayerFeature,
  FastifyPlayerAuthenticationView,
} from '@/player/infrastructure/features/authenticate-player';

import {
  FastifyPlayerRegistrationView,
  type RegisterPlayerFeature,
  type RegisterPlayerRequestBody,
  registerPlayerRequestBodySchema,
} from '@/player/infrastructure/features/register-player';
import { AuthenticationGuard } from './authentication.guard';
import { Identity } from './identity.decorator';
import { AuthenticatePlayerFeatureToken, RegisterPlayerFeatureToken } from './tokens';

@Controller('players')
export class PlayerController {
  constructor(
    @Inject(RegisterPlayerFeatureToken) private readonly _registerPlayer: RegisterPlayerFeature,
    @Inject(AuthenticatePlayerFeatureToken)
    private readonly _authenticatePlayer: AuthenticatePlayerFeature,
  ) {}

  @Get('me')
  @UseGuards(AuthenticationGuard)
  async getCurrentPlayer(
    @Identity() identity: AuthenticatedIdentity,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const playerAuthenticationViewModel = await this._authenticatePlayer({
      externalAccountId: identity.externalAccountId,
    });

    const view = new FastifyPlayerAuthenticationView(response);
    view.render(playerAuthenticationViewModel);
  }

  @Post()
  @UseGuards(AuthenticationGuard)
  async register(
    @Body()
    requestBody: RegisterPlayerRequestBody,
    @Identity() identity: AuthenticatedIdentity,
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
    const playerRegistrationViewModel = await this._registerPlayer({
      ...requestBody,
      externalAccountId: identity.externalAccountId,
    });
    const view = new FastifyPlayerRegistrationView(response);
    view.render(playerRegistrationViewModel);
  }
}
