import type { RegisterPlayerInput } from "./register-player.input";
import { Nickname } from "player-domain";

export class RegisterPlayerUseCase {
  constructor() {}

  async execute(registerPlayerInput: RegisterPlayerInput): Promise<void> {
    const nickname = Nickname.create(registerPlayerInput.nickname);
  }
}
