export interface PlayerRegistrationViewModel {
  status: 'FAILURE' | 'SUCCESS';
  errors: {
    nickname: {
      code:
        | 'NICKNAME_TOO_SHORT'
        | 'NICKNAME_TOO_LONG'
        | 'NICKNAME_FORBIDDEN_CHARACTERS'
        | 'NICKNAME_TOO_FEW_ALPHANUMERIC';
      label: string;
    }[];
  };
}
