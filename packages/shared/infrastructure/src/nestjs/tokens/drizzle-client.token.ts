import type { InjectionToken } from '@nestjs/common';
import type { DatabaseClient as DatabaseClientType } from '../../database/drizzle';

export const DatabaseClient = Symbol(
  'DatabaseClient',
) as InjectionToken<DatabaseClientType>;
