import { LOG_FORMATS, LOG_LEVELS } from '@shared/infrastructure';
import { string, z } from 'zod';

export const AppConfigSchema = z.object({
  BACKEND_HOST: z.string(),
  BACKEND_PORT: z.string(),
  ALLOWED_ORIGINS: z.string(),
  LOG_LEVEL: z.enum(LOG_LEVELS),
  LOG_FORMAT: z.enum(LOG_FORMATS),
  DATABASE_URL: z.string(),
  AUTHENTICATION_JWKS_URL: z.string(),
  AUTHENTICATION_ISSUER_URL: z.string(),
  AUTHENTICATION_AUTHORIZATION_URL: z.string(),
  AUTHENTICATION_TOKEN_URL: z.string(),
});
