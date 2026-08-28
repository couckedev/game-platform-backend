import {
  NicknameContainsForbiddenCharactersError,
  NicknameTooFewLettersError,
  NicknameTooLongError,
  NicknameTooShortError,
} from '@player/domain';

export type PlayerRegistrationError =
  | NicknameTooShortError
  | NicknameTooLongError
  | NicknameTooFewLettersError
  | NicknameContainsForbiddenCharactersError;

export function isPlayerRegistrationError(
  error: unknown,
): error is PlayerRegistrationError {
  return (
    error instanceof NicknameTooShortError ||
    error instanceof NicknameTooLongError ||
    error instanceof NicknameTooFewLettersError ||
    error instanceof NicknameContainsForbiddenCharactersError
  );
}
