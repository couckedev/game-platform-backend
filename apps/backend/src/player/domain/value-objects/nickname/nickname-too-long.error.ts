export class NicknameTooLongError extends Error {
  readonly message = 'Nickname is too long';
  readonly reason = 'NICKNAME_TOO_LONG';
  readonly name = NicknameTooLongError.name;
}
