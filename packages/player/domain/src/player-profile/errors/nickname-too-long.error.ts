import { BusinessError } from "@couckedev/ddd-core";
import { NicknameMaximumLength } from "../specifications/nickname-maximum-length/nickname-maximum-length.specification";

export class NicknameTooLongError extends BusinessError {
  constructor(nickname: string) {
    super(
      `Nickname maximum lenght is ${NicknameMaximumLength.NICKNAME_MAXIMUM_LENGTH}, ${nickname} is too long`,
    );
  }
}
