import { Controller, Get, Post, Res } from '@nestjs/common';

import type { FastifyReply } from 'fastify';

@Controller('players')
export class PlayerController {
  @Get('me')
  getCurrentPlayer(@Res({ passthrough: true }) response: FastifyReply) {
    response.status(404).send({ message: 'Player not found' });
  }

  @Post()
  register(@Res({ passthrough: true }) response: FastifyReply) {
    response.status(201).send({});
  }
}
