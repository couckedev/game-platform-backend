import {
  NicknameAlreadyTakenError,
  NicknameForbiddenCharactersError,
  NicknameTooFewLetters,
  NicknameTooLongError,
  NicknameTooShortError,
} from '@/player/domain';

export type PlayerRegistrationError =
  | NicknameTooShortError
  | NicknameTooLongError
  | NicknameForbiddenCharactersError
  | NicknameTooFewLetters
  | NicknameAlreadyTakenError;

export function isPlayerRegistrationError(error: unknown): error is PlayerRegistrationError {
  return (
    error instanceof NicknameTooShortError ||
    error instanceof NicknameTooLongError ||
    error instanceof NicknameForbiddenCharactersError ||
    error instanceof NicknameTooFewLetters ||
    error instanceof NicknameAlreadyTakenError
  );
}
