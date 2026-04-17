import type { ClockPort } from "shared-time";
import type { RegisterPlayerInput } from "./register-player.input";
import { Nickname, NicknameAlreadyClaimedError, NicknameClaim, type NicknameClaimRepositoryPort, PlayerId } from "player-domain";

export class RegisterPlayerUseCase {
  constructor(
    protected readonly nicknameClaimRepository: NicknameClaimRepositoryPort,
    protected readonly clock: ClockPort
  ) {}

  async execute(registerPlayerInput: RegisterPlayerInput): Promise<void> {
    const nickname = Nickname.create(registerPlayerInput.nickname);
    let nicknameClaim = await this.nicknameClaimRepository.load(nickname);

    if(nicknameClaim === null) {
      nicknameClaim = new NicknameClaim(nickname);
    }

    if(nicknameClaim.isReserved()) {
      throw new NicknameAlreadyClaimedError(nickname);
    }

    const claimer = new PlayerId(registerPlayerInput.playerId);
    nicknameClaim.claim(claimer, this.clock.now())
  }
}
