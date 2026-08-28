export function isUniqueConstraintViolation(e: unknown): boolean {
  return (
    e instanceof Error &&
    e instanceof Error &&
    e.cause instanceof Error &&
    'code' in e.cause &&
    e.cause.code === '23505'
  );
}
