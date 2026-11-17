import type { AppConfig } from './app-config.interface';
import { getEnvVar } from './get-env-var';

export function provideAppConfig(): AppConfig {
  return {
    frontend: {
      baseUrl: getEnvVar('BASE_URL', import.meta.env),
    },
  };
}
