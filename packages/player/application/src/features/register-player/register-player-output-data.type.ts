export type RegisterPlayerOutputData =
  | {
      status: 'SUCCESS';
    }
  | { status: 'FAILURE'; rejectionReason: 'NICKNAME_TOO_SHORT' };
