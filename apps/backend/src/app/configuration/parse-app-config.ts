import { AppConfigSchema } from './app-config.schema';

export function parseAppConfig(env: NodeJS.ProcessEnv) {
  const parsed = AppConfigSchema.parse(env);

  return {
    loggerConfig: {
      level: parsed.LOG_LEVEL,
      format: parsed.LOG_FORMAT,
      output: 'stdout' as const,
    },
    backend: {
      host: parsed.BACKEND_HOST,
      port: parsed.BACKEND_PORT,
      allowedOrigins: parsed.ALLOWED_ORIGINS,
    },
  };
}
