export type RegisterPlayerOutputData =
  | {
      status: 'SUCCESS';
    }
  | { status: 'FAILURE'; reason: 'NICKNAME_TOO_SHORT' | 'NICKNAME_TOO_LONG' };
