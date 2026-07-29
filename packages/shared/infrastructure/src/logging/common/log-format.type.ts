export const LOG_FORMATS = ['json', 'pretty'];

export type LogFormat = (typeof LOG_FORMATS)[number];

export function isLogFormat(value: unknown): value is LogFormat {
  return LOG_FORMATS.includes(value as LogFormat);
}
