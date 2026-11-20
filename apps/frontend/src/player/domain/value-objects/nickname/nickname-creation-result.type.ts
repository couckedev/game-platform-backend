import type { NicknameCreationRejectionReason } from './nickname-creation-rejection-reason.type';
import type { NicknameValueObject } from './nickname-value-object';

export type NicknameCreationResult =
  | { errors: NicknameCreationRejectionReason[] }
  | { nickname: NicknameValueObject };
