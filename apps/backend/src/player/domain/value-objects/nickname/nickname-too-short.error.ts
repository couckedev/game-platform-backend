export class NicknameTooShortError extends Error {
  readonly message = 'Nickname is too short';
  readonly reason = 'NICKNAME_TOO_SHORT';
  readonly name = NicknameTooShortError.name;
}
