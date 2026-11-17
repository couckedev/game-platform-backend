import { NicknameTooShortError } from '../../errors';

export class Nickname {
  static readonly MINIMUM_LENGTH = 8;
  constructor(public readonly value: string) {}

  static create(value: string): Nickname {
    if (value.length < Nickname.MINIMUM_LENGTH) {
      throw new NicknameTooShortError();
    }
    return new Nickname(value);
  }
}
