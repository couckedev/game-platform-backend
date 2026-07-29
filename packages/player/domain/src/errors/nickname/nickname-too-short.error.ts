import { Nickname } from '../../value-objects';

export class NicknameTooShortError extends Error {
  readonly reason = 'NICKNAME_TOO_SHORT';

  constructor(nickname: string) {
    super(
      `Nickname must be at least ${Nickname.MINIMUM_LENGTH} characters long, ${nickname} given`,
    );
  }
}
