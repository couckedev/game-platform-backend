import { World, setWorldConstructor } from "@cucumber/cucumber";
import type { IWorldOptions } from "@cucumber/cucumber";
import { RegisterPlayerUseCase } from "player-application";
import { FixedClock, InMemoryExternalAccountLinkRepository, InMemoryNicknameClaimRepository, InMemoryPlayerAccountRepository } from "player-infrastructure";

export class GamePlatformWorld extends World {
  playerId = "";
  externalAccountid = "";
  nickname = "";
  registrationError: Error | null = null;

  nicknameClaimRepository = new InMemoryNicknameClaimRepository();
  externalAccountLinkRepository = new InMemoryExternalAccountLinkRepository();
  playerAccountRepository = new InMemoryPlayerAccountRepository();
  fixedTime = Temporal.Instant.from("2026-04-15T12:00:00Z");
  clock = new FixedClock(this.fixedTime);
  registerPlayerUseCase = new RegisterPlayerUseCase(this.nicknameClaimRepository, this.externalAccountLinkRepository, this.playerAccountRepository, this.clock);

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(GamePlatformWorld);
