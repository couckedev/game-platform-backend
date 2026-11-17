export class NicknameAlreadyTakenError extends Error {
  readonly message = 'Nickname is already taken';
  readonly reason = 'NICKNAME_ALREADY_TAKEN';
  readonly name = NicknameAlreadyTakenError.name;
}
