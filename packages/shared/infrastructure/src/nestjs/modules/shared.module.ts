import { Global, Module } from '@nestjs/common';
import { loggerProvider } from '../injection/providers/index.js';
import { LOGGER } from '../injection/tokens/index.js';
import { NestLogger } from '../services/index.js';

@Global()
@Module({
  providers: [loggerProvider, NestLogger],
  exports: [NestLogger, LOGGER],
})
export class SharedModule {}
