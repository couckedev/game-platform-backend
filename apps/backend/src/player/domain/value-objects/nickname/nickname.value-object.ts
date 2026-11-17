import { NicknameForbiddenCharactersError } from './nickname-forbidden-characters-.error';
import { NicknameTooLongError } from './nickname-too-long.error';
import { NicknameTooShortError } from './nickname-too-short.error';

export class Nickname {
  static readonly MINIMUM_LENGTH = 8;
  static readonly MAXIMUM_LENGTH = 20;
  static readonly FORBIDDEN_CHARACTERS_REGEX = /[^A-Za-z0-9-_]/;

  constructor(public readonly value: string) {}

  static create(value: string) {
    if (value.length < Nickname.MINIMUM_LENGTH) {
      throw new NicknameTooShortError();
    }
    if (value.length > Nickname.MAXIMUM_LENGTH) {
      throw new NicknameTooLongError();
    }
    if (Nickname.FORBIDDEN_CHARACTERS_REGEX.test(value)) {
      throw new NicknameForbiddenCharactersError();
    }
    return new Nickname(value);
  }
}
