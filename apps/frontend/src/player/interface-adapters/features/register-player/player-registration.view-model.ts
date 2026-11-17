export type PlayerRegistrationViewModel =
  | {
      status: 'SUCCESS';
      registeredPlayer: {
        nickname: string;
      };
    }
  | { status: 'FAILURE'; rejectionReason: 'NICKNAME_TOO_SHORT' };
