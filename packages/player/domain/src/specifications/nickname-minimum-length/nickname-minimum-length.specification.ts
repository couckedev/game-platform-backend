export class NicknameMinimumLength {
    public static readonly  NICKNAME_MINIMUM_LENGTH = 5;

    static isSatisfiedBy(nickname: string): boolean {
        return nickname.length >= NicknameMinimumLength.NICKNAME_MINIMUM_LENGTH
    }
}