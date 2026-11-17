export class NicknameTooFewLetters extends Error {
  readonly message = 'Nickname is contains too few letters';
  readonly reason = 'NICKNAME_TOO_FEW_LETTERS';
  readonly name = NicknameTooFewLetters.name;
}
