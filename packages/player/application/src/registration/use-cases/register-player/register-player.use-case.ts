import type { ClockPort } from "shared-time";
import type { RegisterPlayerInput } from "./register-player.input";
import {
  Nickname,
  Player,
  PlayerId,
  type PlayerRepositoryPort,
  type NicknameUniquenessCheckerPort,
  NicknameAlreadyUsedError,
} from "player-domain";

export class RegisterPlayerUseCase {
  constructor(
    protected readonly clock: ClockPort,
    protected readonly playerRepository: PlayerRepositoryPort,
    protected readonly nicknameUniquenessChecker: NicknameUniquenessCheckerPort,
  ) {}

  async execute(registerPlayerInput: RegisterPlayerInput): Promise<void> {
    const nickname = Nickname.create(registerPlayerInput.nickname);
    const playerId = PlayerId.create(registerPlayerInput.playerId);
    const isNicknameUnique = await this.nicknameUniquenessChecker.isUnique(nickname);
    if(!isNicknameUnique) {
      throw new NicknameAlreadyUsedError(nickname.value)
    }
    const createdAt = this.clock.now();
    const newPlayer = Player.register(playerId, nickname, createdAt);
    await this.playerRepository.save(newPlayer);
  }
}
