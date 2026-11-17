import { NicknameForbiddenCharactersError } from './nickname-forbidden-characters-.error';
import { NicknameTooFewLetters } from './nickname-too-few-letters.error';
import { NicknameTooLongError } from './nickname-too-long.error';
import { NicknameTooShortError } from './nickname-too-short.error';

export class Nickname {
  static readonly MINIMUM_LENGTH = 8;
  static readonly MAXIMUM_LENGTH = 20;
  static readonly FORBIDDEN_CHARACTERS_REGEX = /[^A-Za-z0-9-_]/;
  static readonly MINIMUM_LETTER_COUNT = 3;

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
    const nicknameLetterCount = [...value].filter((character) => /[A-Za-z]/.test(character)).length;
    if (nicknameLetterCount < Nickname.MINIMUM_LETTER_COUNT) {
      throw new NicknameTooFewLetters();
    }

    return new Nickname(value);
  }

  equals(nickname: Nickname): boolean {
    return this.value === nickname.value;
  }
}
