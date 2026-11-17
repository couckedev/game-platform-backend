export type RegisterPlayerOutputData =
  | {
      status: 'SUCCESS';
    }
  | {
      status: 'FAILURE';
      reason:
        | 'NICKNAME_TOO_SHORT'
        | 'NICKNAME_TOO_LONG'
        | 'NICKNAME_FORBIDDEN_CHARACTERS'
        | 'NICKNAME_TOO_FEW_LETTERS'
        | 'NICKNAME_ALREADY_TAKEN';
    };
