import type { ClockPort } from "shared-time";
import type { RegisterPlayerInput } from "./register-player.input";
import {
  ExternalAccountId,
  ExternalAccountLink,
  type ExternalAccountLinkRepositoryPort,
  Nickname,
  NicknameAlreadyClaimedError,
  NicknameClaim,
  type NicknameClaimRepositoryPort,
  PlayerAccount,
  type PlayerAccountRepositoryPort,
  PlayerId,
} from "player-domain";

export class RegisterPlayerUseCase {
  constructor(
    protected readonly nicknameClaimRepository: NicknameClaimRepositoryPort,
    protected readonly externalAccountLinkRepository: ExternalAccountLinkRepositoryPort,
    protected readonly playerAccountRepository: PlayerAccountRepositoryPort,
    protected readonly clock: ClockPort,
  ) {}

  async execute(registerPlayerInput: RegisterPlayerInput): Promise<void> {
    const nickname = Nickname.create(registerPlayerInput.nickname);
    const playerId = new PlayerId(registerPlayerInput.playerId);
    const externalAccountId = new ExternalAccountId(registerPlayerInput.externalAccountId);

    let nicknameClaim = await this.nicknameClaimRepository.load(nickname);

    if (nicknameClaim === null) {
      nicknameClaim = new NicknameClaim(nickname);
    }

    if (nicknameClaim.isReserved()) {
      throw new NicknameAlreadyClaimedError(nickname);
    }

    nicknameClaim.claim(playerId, this.clock.now());
    
    const externalAccountLink = new ExternalAccountLink(externalAccountId, playerId);
    const playerAccount = PlayerAccount.create(playerId, this.clock.now());

    await this.nicknameClaimRepository.save(nicknameClaim);
    await this.externalAccountLinkRepository.save(externalAccountLink);
    await this.playerAccountRepository.save(playerAccount);
  }
}
