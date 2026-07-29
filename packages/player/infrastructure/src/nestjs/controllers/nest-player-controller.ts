import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { ZodValidationPipe } from '@shared/infrastructure/nestjs';
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
  ) {}

  @Post()
  register(
    @Body(new ZodValidationPipe(httpRegisterPlayerRequestSchema))
    registerPlayerRequest: HttpRegisterPlayerRequest,
    @Res() fastifyResponseSender: FastifyReply,
  ): void {
    const viewModel = this.registerPlayerFeature(
      registerPlayerRequest.nickname,
    );
    const view = new HttpPlayerRegistrationView((input) =>
      fastifyResponseSender.status(input.statusCode).send(input.body),
    );
    view.render(viewModel);
  }
}
