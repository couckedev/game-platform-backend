export interface PlayerRegistrationViewModel {
  errors: {
    nickname: {
      code: 'NICKNAME_TOO_SHORT' | 'NICKNAME_TOO_LONG' | 'NICKNAME_FORBIDDEN_CHARACTERS';
      label: string;
    }[];
  };
  player?: {
    nickname: string;
  };
}
