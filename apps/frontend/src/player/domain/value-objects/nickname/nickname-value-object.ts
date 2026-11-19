import type { NicknameCreationRejectionReason } from './nickname-creation-rejection-reason.type';
import type { NicknameCreationResult } from './nickname-creation-result.type';

export class NicknameValueObject {
  constructor(public readonly value: string) {}

  static create(value: string): NicknameCreationResult {
    const errors: NicknameCreationRejectionReason[] = [];

    if (value.length < 8) {
      errors.push('NICKNAME_TOO_SHORT');
    }
    if (value.length > 20) {
      errors.push('NICKNAME_TOO_LONG');
    }
    if (errors.length > 0) {
      return { status: 'FAILURE', errors };
    }

    return { status: 'SUCCESS', value: new NicknameValueObject(value) };
  }
}
