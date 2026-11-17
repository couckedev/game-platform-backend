import { ExpiredAuthenticationError } from './expired-authentication.error';
import { InvalidCredentialsError } from './invalid-credentials.error';
import { MissingSubjectError } from './missing-subject.error';

export type AuthenticationError =
  | MissingSubjectError
  | InvalidCredentialsError
  | ExpiredAuthenticationError;

export function isAuthenticationError(error: unknown): error is AuthenticationError {
  return (
    error instanceof MissingSubjectError ||
    error instanceof InvalidCredentialsError ||
    error instanceof ExpiredAuthenticationError
  );
}
