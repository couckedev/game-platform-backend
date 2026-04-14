import { BusinessError } from "@couckedev/ddd-core";
import { NicknameMinimumLength } from "../specifications/nickname-minimum-length/nickname-minimum-length.specification";

export class NicknameTooShortError extends BusinessError {
  constructor(nickname: string) {
    super(
      `Nickname minimum lenght is ${NicknameMinimumLength.NICKNAME_MINIMUM_LENGTH}, ${nickname} is too short`,
    );
  }
}
