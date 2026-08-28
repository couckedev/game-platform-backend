import { format as winstonFormat } from 'winston';
import type { LogFormat } from '../common';

export function createFormat(format: LogFormat) {
  switch (format) {
    case 'json':
      return winstonFormat.combine(
        winstonFormat.timestamp(),
        winstonFormat.errors({ stack: true }),
        winstonFormat.json(),
      );

    case 'pretty':
      return winstonFormat.combine(
        winstonFormat.colorize(),
        winstonFormat.timestamp(),
        winstonFormat.errors({ stack: true }),
        winstonFormat.printf(({ timestamp, level, message, metadata }) => {
          const metadataString =
            metadata !== undefined
              ? ` ${JSON.stringify(metadata).replace(/\\n/g, '\n')}`
              : '';

          return `${timestamp} ${level}: ${message}${metadataString}`;
        }),
      );
  }
}
