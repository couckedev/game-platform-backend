export class NicknameTooShortError extends Error {
  readonly reason = 'NICKNAME_TOO_SHORT';

  constructor() {
    super(`The nicknameis too short`);
  }
}
