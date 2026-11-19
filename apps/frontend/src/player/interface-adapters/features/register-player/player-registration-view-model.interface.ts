export interface PlayerRegistrationViewModel {
  status: 'FAILURE' | 'SUCCESS';
  errors: {
    nickname: {
      code: 'NICKNAME_TOO_SHORT' | 'NICKNAME_TOO_LONG';
      label: string;
    }[];
  };
}
