export class ExpiredAuthenticationError extends Error {
  readonly message = 'Authentication expired';
  readonly name = ExpiredAuthenticationError.name;
}
