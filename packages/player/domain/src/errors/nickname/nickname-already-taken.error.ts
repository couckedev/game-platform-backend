export class NicknameAlreadyTakenError extends Error {
  readonly reason = 'NICKNAME_ALREADY_TAKEN';

  constructor(nickname: string) {
    super(`Nickname ${nickname} given is already taken`);
  }
}
