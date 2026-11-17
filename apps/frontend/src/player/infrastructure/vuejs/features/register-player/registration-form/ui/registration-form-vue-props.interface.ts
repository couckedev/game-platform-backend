interface RegistrationError {
  errorCode: string;
  errorMessage: string;
}

export interface RegistrationFormVueProps {
  registrationError: RegistrationError | null;
}
