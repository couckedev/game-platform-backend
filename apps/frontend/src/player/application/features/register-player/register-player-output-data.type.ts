import type { NicknameCreationRejectionReason } from '@/player/domain/value-objects/nickname';

export type RegisterPlayerOutputData =
  | {
      status: 'FAILURE';
      errors: {
        nickname: NicknameCreationRejectionReason[];
      };
    }
  | {
      status: 'SUCCESS';
    };
