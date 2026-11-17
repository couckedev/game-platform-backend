import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { Authenticated } from '@/player/infrastructure/authentication/common';

export const Identity = createParamDecorator((_data: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest<Authenticated & FastifyRequest>();
  return request.identity;
});
