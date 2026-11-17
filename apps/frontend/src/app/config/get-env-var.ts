export function getEnvVar(key: string, envSource: Record<string, string>): string {
  if (envSource[key] === undefined || envSource[key].length === 0) {
    throw new Error(`${key} env var has not been provided`);
  }
  return envSource[key];
}
