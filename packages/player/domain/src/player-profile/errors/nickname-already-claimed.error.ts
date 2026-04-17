import { BusinessError } from "@couckedev/ddd-core";
import type { Nickname } from "../value-objects/nickname/nickname.value-object";

export class NicknameAlreadyClaimedError extends BusinessError {
  constructor(nickname: Nickname) {
    super(
      `Nickname ${nickname.value} is already claimed by another player`,
    );
  }
}
