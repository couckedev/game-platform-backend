export class NicknameMinimumLetterCount {
  public static readonly MINIMUM_LETTER_COUNT = 3;

  static isSatisfiedBy(nickname: string): boolean {
    const nicknameAlphaCharacters = nickname.match(/[a-zA-Z]/g) ?? [];
    return (
      nicknameAlphaCharacters.length >=
      NicknameMinimumLetterCount.MINIMUM_LETTER_COUNT
    );
  }
}
