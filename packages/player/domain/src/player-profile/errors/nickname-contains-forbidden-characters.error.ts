import { BusinessError } from "@couckedev/ddd-core";

export class NicknameContainsForbiddenCharactersError extends BusinessError {
  constructor(nickname: string) {
    super(
      `Nickname ${nickname} must only contains alphanumeric characters, hyphens and underscores`,
    );
  }
}
