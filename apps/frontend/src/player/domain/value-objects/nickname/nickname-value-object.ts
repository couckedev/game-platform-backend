import type { NicknameCreationRejectionReason } from './nickname-creation-rejection-reason.type';
import type { NicknameCreationResult } from './nickname-creation-result.type';

export class NicknameValueObject {
  private static MINIMUM_LENGTH = 8;
  private static MAXIMUM_LENGTH = 20;
  private static FORBIDDEN_CHARACTERS = /[^A-Za-z0-9_-]/;

  constructor(public readonly value: string) {}

  static create(value: string): NicknameCreationResult {
    const errors: NicknameCreationRejectionReason[] = [];

    if (value.length < NicknameValueObject.MINIMUM_LENGTH) {
      errors.push('NICKNAME_TOO_SHORT');
    }
    if (value.length > NicknameValueObject.MAXIMUM_LENGTH) {
      errors.push('NICKNAME_TOO_LONG');
    }

    if (NicknameValueObject.FORBIDDEN_CHARACTERS.test(value)) {
      errors.push('NICKNAME_FORBIDDEN_CHARACTERS');
    }
    if (errors.length > 0) {
      return { errors };
    }

    return { nickname: new NicknameValueObject(value) };
  }
}
