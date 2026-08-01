import { AppConfigSchema } from './app-config.schema';

export function parseAppConfig(env: NodeJS.ProcessEnv) {
  const parsed = AppConfigSchema.parse(env);

  return {
    logger: {
      level: parsed.LOG_LEVEL,
      format: parsed.LOG_FORMAT,
      output: 'stdout' as const,
    },
    database: {
      url: parsed.DATABASE_URL,
    },
    backend: {
      host: parsed.BACKEND_HOST,
      port: parsed.BACKEND_PORT,
      allowedOrigins: parsed.ALLOWED_ORIGINS,
    },
    authentication: {
      jwksUrl: parsed.AUTHENTICATION_JWKS_URL,
      issuerUrl: parsed.AUTHENTICATION_ISSUER_URL,
      authorizationUrl: parsed.AUTHENTICATION_AUTHORIZATION_URL,
      tokenUrl: parsed.AUTHENTICATION_TOKEN_URL,
    },
  };
}
