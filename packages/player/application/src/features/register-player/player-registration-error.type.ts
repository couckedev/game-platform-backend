import {
  NicknameTooFewLettersError,
  NicknameTooLongError,
  NicknameTooShortError,
} from '@player/domain';

export type PlayerRegistrationError =
  | NicknameTooShortError
  | NicknameTooLongError
  | NicknameTooFewLettersError;

export function isPlayerRegistrationError(
  error: unknown,
): error is PlayerRegistrationError {
  return (
    error instanceof NicknameTooShortError ||
    error instanceof NicknameTooLongError ||
    error instanceof NicknameTooFewLettersError
  );
}
