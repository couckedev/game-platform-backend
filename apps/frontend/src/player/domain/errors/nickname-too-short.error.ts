export class NicknameTooShortError extends Error {
  readonly reason = 'NICKNAME_TOO_SHORT';

  constructor() {
    super(`The nickname is too short`);
  }
}
