export class NicknameAllowedCharacters {
  public static readonly ALLOWED_CHARACTERS_REGEX = /^[a-zA-Z0-9_-]+$/;

  static isSatisfiedBy(nickname: string): boolean {
    return NicknameAllowedCharacters.ALLOWED_CHARACTERS_REGEX.test(nickname);
  }
}
