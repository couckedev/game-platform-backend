import type { LoggerPort } from "shared-kernels-logging";

export class SilentLogger implements LoggerPort {
  info(_message: string, _context?: Record<string, unknown>): void {}
  warning(_message: string, _context?: Record<string, unknown>): void {}
  error(_message: string, _context?: Record<string, unknown>): void {}
}
