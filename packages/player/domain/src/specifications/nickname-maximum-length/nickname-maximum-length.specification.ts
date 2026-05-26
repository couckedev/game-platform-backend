export class NicknameMaximumLength {
  public static readonly NICKNAME_MAXIMUM_LENGTH = 20;

  static isSatisfiedBy(nickname: string): boolean {
    return nickname.length <= NicknameMaximumLength.NICKNAME_MAXIMUM_LENGTH;
  }
}
