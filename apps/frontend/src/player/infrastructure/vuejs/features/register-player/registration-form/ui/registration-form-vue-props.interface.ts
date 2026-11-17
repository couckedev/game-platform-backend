interface NicknameError {
  errorCode: string;
  errorMessage: string;
}

export interface RegistrationFormVueProps {
  nicknameErrors: NicknameError[];
}
