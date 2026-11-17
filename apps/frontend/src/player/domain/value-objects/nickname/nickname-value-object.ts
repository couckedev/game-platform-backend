import type { NicknameCreationRejectionReason } from '../../errors';
import type { NicknameCreationResult } from './nickname-creation-result.type';

export class Nickname {
  static readonly MINIMUM_LENGTH = 8;
  static readonly MAXIMUM_LENGTH = 20;
  static readonly FORBIDDEN_CHARACTERS_REGEX = /[^A-Za-z0-9_-]/;

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
    if (errors.length > 0) {
      return { status: 'FAILURE', errors };
    }
    return { status: 'SUCCESS', value: new Nickname(value) };
  }
}
