import { BusinessError } from "@couckedev/ddd-core";
import { NicknameMinimumLetterCount } from "../specifications/nickname-minimum-letter-count/nickname-minimum-letter-count.specification";

export class NicknameInsufficientLetterCountError extends BusinessError {
  constructor(nickname: string) {
    super(
      `Nickname ${nickname} must contain at least ${NicknameMinimumLetterCount.MINIMUM_LETTER_COUNT} letters`,
    );
  }
}
