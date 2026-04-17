import { BusinessError } from "@couckedev/ddd-core";

export class NicknameContainsForbiddenCharactersError extends BusinessError {
  constructor(nickname: string) {
    super(
      `Nickname ${nickname} must only contain alphanumeric characters, hyphens and underscores`,
    );
  }
}
