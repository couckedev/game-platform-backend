import { Nickname } from '../../value-objects';

export class NicknameTooLongError extends Error {
  readonly reason = 'NICKNAME_TOO_LONG';

  constructor(nickname: string) {
    super(
      `Nickname must not exceed ${Nickname.MAXIMUM_LENGTH} characters, ${nickname} given`,
    );
  }
}
