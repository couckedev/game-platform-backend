import type { ClockPort } from "shared-time";
import type { RegisterPlayerInput } from "./register-player.input";
import { Nickname } from "player-domain";

export class RegisterPlayerUseCase {
  constructor(protected readonly clock: ClockPort) {}

  async execute(registerPlayerInput: RegisterPlayerInput): Promise<void> {
    const nickname = Nickname.create(registerPlayerInput.nickname);
  }
}
