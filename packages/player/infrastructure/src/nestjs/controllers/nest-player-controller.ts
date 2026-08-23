import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type {
  HttpAuthenticatedRequest,
  Logger as LoggerType,
} from '@shared/infrastructure';
import {
  Logger,
  NestHttpAuthenticationGuard,
  ZodValidationPipe,
} from '@shared/infrastructure/nestjs';
import type { FastifyReply } from 'fastify';
import type {
  AuthenticatePlayerFeature as AuthenticatePlayerFeatureType,
  RegisterPlayerFeature as RegisterPlayerFeatureType,
} from '../../composition';
import { HttpPlayerAuthenticationView } from '../../http/authenticate-player';
import {
  HttpPlayerRegistrationView,
  type HttpRegisterPlayerRequest,
  httpRegisterPlayerRequestSchema,
} from '../../http/register-player';
import { AuthenticatePlayerFeature, RegisterPlayerFeature } from '../tokens';

@Controller('players')
export class NestPlayerController {
  constructor(
    @Inject(RegisterPlayerFeature)
    private readonly registerPlayerFeature: RegisterPlayerFeatureType,
    @Inject(AuthenticatePlayerFeature)
    private readonly authenticatePlayerFeature: AuthenticatePlayerFeatureType,
    @Inject(Logger) private readonly logger: LoggerType,
  ) {}

  @Post()
  @UseGuards(NestHttpAuthenticationGuard)
  async register(
    @Body(new ZodValidationPipe(httpRegisterPlayerRequestSchema))
    registerPlayerRequest: HttpRegisterPlayerRequest,
    @Req() request: HttpAuthenticatedRequest,
    @Res() fastifyResponseSender: FastifyReply,
  ): Promise<void> {
    const viewModel = await this.registerPlayerFeature(
      registerPlayerRequest.nickname,
      request.authenticatedIdentity.externalAccountId,
    );
    const view = new HttpPlayerRegistrationView((input) =>
      fastifyResponseSender.status(input.statusCode).send(input.body),
    );
    view.render(viewModel);
    if (viewModel.status === 'FAILURE') {
      this.logger.warning('Player registration failed', {
        reason: viewModel.rejectionReason,
      });
    }
  }

  @Get('me')
  @UseGuards(NestHttpAuthenticationGuard)
  async getCurrentPlayer(
    @Req() request: HttpAuthenticatedRequest,
    @Res() fastifyResponseSender: FastifyReply,
  ): Promise<void> {
    const viewModel = await this.authenticatePlayerFeature(
      request.authenticatedIdentity.externalAccountId,
    );
    const view = new HttpPlayerAuthenticationView((input) =>
      fastifyResponseSender.status(input.statusCode).send(input.body),
    );
    view.render(viewModel);
  }
}
