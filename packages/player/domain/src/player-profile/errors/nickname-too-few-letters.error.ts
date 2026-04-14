import { BusinessError } from "@couckedev/ddd-core";
import { NicknameMinimumLetterCount } from "../specifications/nickname-minimum-letter-count/nickname-minimum-letter-count.specification";
import { NicknameRejectionReason } from "../enums/nickname-rejection-reason.enum";

export class NicknameTooFewletters extends BusinessError {
  readonly code = NicknameRejectionReason.TooFewLetters;

  constructor(nickname: string) {
    super(
      `Nickname ${nickname} must contain at least ${NicknameMinimumLetterCount.MINIMUM_LETTER_COUNT} letters`,
    );
  }
}
