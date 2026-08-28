export class NicknameContainsForbiddenCharactersError extends Error {
  readonly reason = 'NICKNAME_CONTAINS_FORBIDDEN_CHARACTERS';

  constructor(nickname: string) {
    super(
      `Nickname must only contain letters, digits, hyphens and underscores, ${nickname} given`,
    );
  }
}
