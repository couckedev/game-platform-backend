import type { FactoryProvider } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';
import { LOGGER } from '../tokens/logger.token.js';

export const loggerProvider: FactoryProvider = {
  provide: LOGGER,
  useFactory: () =>
    createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.json(),
      ),
      transports: [new transports.Console()],
    }),
};
