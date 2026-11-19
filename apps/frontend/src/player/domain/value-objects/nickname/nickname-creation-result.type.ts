import type { NicknameCreationRejectionReason } from './nickname-creation-rejection-reason.type';
import type { NicknameValueObject } from './nickname-value-object';

export type NicknameCreationResult =
  | { status: 'FAILURE'; errors: NicknameCreationRejectionReason[] }
  | { status: 'SUCCESS'; value: NicknameValueObject };
