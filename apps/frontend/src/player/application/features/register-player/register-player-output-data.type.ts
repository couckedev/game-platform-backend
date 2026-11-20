import type { NicknameCreationRejectionReason } from '@/player/domain/value-objects/nickname';

export type RegisterPlayerOutputData =
  | {
      errors: {
        nickname: NicknameCreationRejectionReason[];
      };
    }
  | {
      player: {
        nickname: string;
      };
    };
