import { Nickname } from '../../value-objects';

export class NicknameTooShortError extends Error {
  readonly reason = 'NICKNAME_TOO_SHORT';

  constructor(nickname: string) {
    super(
      `Nickname must be 5 characters longer at least ${Nickname.MINIMUM_LENGTH}, ${nickname} given`,
    );
  }
}
