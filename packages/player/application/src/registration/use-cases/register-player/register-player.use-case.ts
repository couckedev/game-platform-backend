import type { ClockPort } from "shared-time";
import type { RegisterPlayerInput } from "./register-player.input";
import { Nickname, Player, PlayerId, type PlayerRepositoryPort } from "player-domain";

export class RegisterPlayerUseCase {
  constructor(
    protected readonly clock: ClockPort,
    protected readonly playerRepository: PlayerRepositoryPort
  ) {}

  async execute(registerPlayerInput: RegisterPlayerInput): Promise<void> {
    const nickname = Nickname.create(registerPlayerInput.nickname);
    const createdAt = this.clock.now();
    const playerId = PlayerId.create(registerPlayerInput.playerId);
    const newPlayer = Player.create(playerId, nickname, createdAt);
    await this.playerRepository.save(newPlayer);
  }
}
