export class HttpAuthorizationError extends Error {
  constructor(cause: string) {
    super('Missing or invalid http request authorization header', { cause });
  }
}
