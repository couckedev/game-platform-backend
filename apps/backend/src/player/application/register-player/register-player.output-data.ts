export type RegisterPlayerOutputData =
  | {
      status: 'SUCCESS';
    }
  | { status: 'FAILURE'; reason: 'NICKNAME_TOO_SHORT' };
