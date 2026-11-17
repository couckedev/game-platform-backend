export type RegisterPlayerOutputData =
  | {
      status: 'SUCCESS';
      registeredPlayer: {
        nickname: string;
      };
    }
  | { status: 'FAILURE'; rejectionReason: 'NICKNAME_TOO_SHORT' | 'NICKNAME_TOO_LONG' };
