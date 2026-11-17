import type { PlayerRegistrationRejectionReason } from './player-registration-rejection-reason.type';

export type RegisterPlayerOutputData =
  | {
      status: 'SUCCESS';
      registeredPlayer: {
        nickname: string;
      };
    }
  | {
      status: 'FAILURE';
      rejectionReasons: PlayerRegistrationRejectionReason[];
    };
