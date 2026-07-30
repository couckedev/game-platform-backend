import {
  NicknameTooFewLettersError,
  NicknameTooLongError,
  NicknameTooShortError,
} from '../../errors/nickname';

export class Nickname {
  static readonly MINIMUM_LENGTH = 5;
  static readonly MAXIMUM_LENGTH = 20;
  static readonly MINIMUM_LETTERS_COUNT = 3;

  private constructor(public readonly value: string) {}

  static create(value: string) {
    if (value.length < Nickname.MINIMUM_LENGTH) {
      throw new NicknameTooShortError(value);
    }
    if (value.length > Nickname.MAXIMUM_LENGTH) {
      throw new NicknameTooLongError(value);
    }
    const nicknameLetterCount = [...value].filter((char) =>
      /[a-zA-Z]/.test(char),
    ).length;
    if (nicknameLetterCount < Nickname.MINIMUM_LETTERS_COUNT) {
      throw new NicknameTooFewLettersError(value);
    }
    return new Nickname(value);
  }
}
