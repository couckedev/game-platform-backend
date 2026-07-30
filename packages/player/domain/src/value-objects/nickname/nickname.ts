import {
  NicknameTooLongError,
  NicknameTooShortError,
} from '../../errors/nickname';

export class Nickname {
  static readonly MINIMUM_LENGTH = 5;
  static readonly MAXIMUM_LENGTH = 20;

  private constructor(public readonly value: string) {}

  static create(value: string) {
    if (value.length < Nickname.MINIMUM_LENGTH) {
      throw new NicknameTooShortError(value);
    }
    if (value.length > Nickname.MAXIMUM_LENGTH) {
      throw new NicknameTooLongError(value);
    }
    return new Nickname(value);
  }
}
