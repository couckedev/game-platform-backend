import { NicknameTooShortError } from './nickname-too-short.error';

export class Nickname {
  static readonly MINIMUM_LENGTH = 8;

  constructor(public readonly value: string) {}

  static create(value: string) {
    if (value.length < Nickname.MINIMUM_LENGTH) {
      throw new NicknameTooShortError();
    }
    return new Nickname(value);
  }
}
