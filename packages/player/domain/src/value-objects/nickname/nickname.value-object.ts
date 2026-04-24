import { NicknameInvalidCharactersError } from "../../errors/nickname-invalid-characters.error";
import { NicknameTooFewletters } from "../../errors/nickname-too-few-letters.error";
import { NicknameTooLongError } from "../../errors/nickname-too-long.error";
import { NicknameTooShortError } from "../../errors/nickname-too-short.error";
import { NicknameAllowedCharacters } from "../../specifications/nickname-allowed-characters/nickname-allowed-characters.specification";
import { NicknameMaximumLength } from "../../specifications/nickname-maximum-length/nickname-maximum-length.specification";
import { NicknameMinimumLength } from "../../specifications/nickname-minimum-length/nickname-minimum-length.specification";
import { NicknameMinimumLetterCount } from "../../specifications/nickname-minimum-letter-count/nickname-minimum-letter-count.specification";

export class Nickname {
  private constructor(public readonly value: string) {}

  static create(value: string): Nickname {
    if (!NicknameMinimumLength.isSatisfiedBy(value)) {
      throw new NicknameTooShortError(value);
    }
    if (!NicknameMaximumLength.isSatisfiedBy(value)) {
      throw new NicknameTooLongError(value);
    }
    if (!NicknameAllowedCharacters.isSatisfiedBy(value)) {
      throw new NicknameInvalidCharactersError(value);
    }
    if (!NicknameMinimumLetterCount.isSatisfiedBy(value)) {
      throw new NicknameTooFewletters(value);
    }
    return new Nickname(value);
  }

  equals(nickname: Nickname): boolean {
    return this.value === nickname.value;
  }
}
