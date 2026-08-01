import { Body, Controller, Inject, Post, Res, UseGuards } from '@nestjs/common';
import type { Logger as LoggerType } from '@shared/infrastructure';
import {
  Logger,
  NestHttpAuthenticationGuard,
  ZodValidationPipe,
} from '@shared/infrastructure/nestjs';
import type { FastifyReply } from 'fastify';
import type { RegisterPlayerFeature as RegisterPlayerFeatureType } from '../../composition/types';
import {
  HttpPlayerRegistrationView,
  type HttpRegisterPlayerRequest,
  httpRegisterPlayerRequestSchema,
} from '../../http/register-player';
import { RegisterPlayerFeature } from '../tokens';

@Controller('players')
export class NestPlayerController {
  constructor(
    @Inject(RegisterPlayerFeature)
    private readonly registerPlayerFeature: RegisterPlayerFeatureType,
    @Inject(Logger) private readonly logger: LoggerType,
  ) {}

  @Post()
  @UseGuards(NestHttpAuthenticationGuard)
  async register(
    @Body(new ZodValidationPipe(httpRegisterPlayerRequestSchema))
    registerPlayerRequest: HttpRegisterPlayerRequest,
    @Res() fastifyResponseSender: FastifyReply,
  ): Promise<void> {
    const viewModel = await this.registerPlayerFeature(
      registerPlayerRequest.nickname,
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
}
