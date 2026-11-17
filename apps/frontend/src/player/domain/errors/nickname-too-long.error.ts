export class NicknameTooLongError extends Error {
  readonly reason = 'NICKNAME_TOO_LONG';

  constructor() {
    super(`The nickname is too long`);
  }
}
