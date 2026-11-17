export class NicknameForbiddenCharactersError extends Error {
  readonly message = 'Nickname contaoins forbidden characters';
  readonly reason = 'NICKNAME_FORBIDDEN_CHARACTERS';
  readonly name = NicknameForbiddenCharactersError.name;
}
