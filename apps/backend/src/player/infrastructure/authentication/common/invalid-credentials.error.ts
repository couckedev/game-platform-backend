export class InvalidCredentialsError extends Error {
  readonly message = 'Invalid credentials';
  readonly name = InvalidCredentialsError.name;
}
