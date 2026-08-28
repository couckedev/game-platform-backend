import { Nickname } from '../../value-objects';

export class NicknameTooFewLettersError extends Error {
  readonly reason = 'NICKNAME_TOO_FEW_LETTERS';

  constructor(nickname: string) {
    super(
      `Nickname must contain ${Nickname.MINIMUM_LETTERS_COUNT} letters at least, ${nickname} given`,
    );
  }
}
