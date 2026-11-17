type NicknameErrorCode =
  | 'NICKNAME_TOO_SHORT'
  | 'NICKNAME_TOO_LONG'
  | 'NICKNAME_CONTAINS_FORBIDDEN_CHARACTERS'
  | 'NICKNAME_TOO_FEW_LETTERS'
  | 'NICKNAME_ALREADY_TAKEN';

export type PlayerRegistrationViewModel =
  | {
      status: 'SUCCESS';
      registeredPlayer: {
        nickname: string;
      };
    }
  | {
      status: 'FAILURE';
      rejectionReasons: {
        nickname: NicknameErrorCode[];
      };
    };
