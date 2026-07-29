import { LOG_FORMATS, LOG_LEVELS } from '@shared/infrastructure';
import { z } from 'zod';

export const AppConfigSchema = z.object({
  BACKEND_HOST: z.string(),
  BACKEND_PORT: z.string(),
  ALLOWED_ORIGINS: z.string(),
  LOG_LEVEL: z.enum(LOG_LEVELS),
  LOG_FORMAT: z.enum(LOG_FORMATS),
});
