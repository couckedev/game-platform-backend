import type { NicknameCreationRejectionReason } from '../../errors';
import type { NicknameCreationResult } from './nickname-creation-result.type';

export class Nickname {
  static readonly MINIMUM_LENGTH = 8;
  static readonly MAXIMUM_LENGTH = 20;
  static readonly FORBIDDEN_CHARACTERS_REGEX = /[^A-Za-z0-9_-]/;
  static readonly MINIMUM_LETTER_COUNT = 3;

  constructor(public readonly value: string) {}

  static create(value: string): NicknameCreationResult {
    const errors: NicknameCreationRejectionReason[] = [];

    if (value.length < Nickname.MINIMUM_LENGTH) {
      errors.push('NICKNAME_TOO_SHORT');
    }
    if (value.length > Nickname.MAXIMUM_LENGTH) {
      errors.push('NICKNAME_TOO_LONG');
    }
    if (Nickname.FORBIDDEN_CHARACTERS_REGEX.test(value)) {
      errors.push('NICKNAME_CONTAINS_FORBIDDEN_CHARACTERS');
    }
    const nicknameLetterCount = [...value].filter((char) => /[a-zA-Z]/.test(char)).length;
    if (nicknameLetterCount < Nickname.MINIMUM_LETTER_COUNT) {
      errors.push('NICKNAME_TOO_FEW_LETTERS');
    }
    if (errors.length > 0) {
      return { status: 'FAILURE', errors };
    }
    return { status: 'SUCCESS', value: new Nickname(value) };
  }

  equals(nickname: Nickname) {
    return this.value === nickname.value;
  }
}
