import type { NicknameCreationRejectionReason } from '@/player/domain';

export type PlayerRegistrationRejectionReason =
  | NicknameCreationRejectionReason
  | 'NICKNAME_ALREADY_TAKEN';
