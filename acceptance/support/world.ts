import { World, setWorldConstructor } from "@cucumber/cucumber";
import type { IWorldOptions } from "@cucumber/cucumber";
import { RegisterPlayerUseCase } from "player-application";
import {
  FixedClock,
  InMemoryNicknameClaimRepository,
} from "player-infrastructure";

export class GamePlatformWorld extends World {
  playerId = "";
  externalAccountid = "";
  nickname = "";
  registrationError: Error | null = null;

  nicknameClaimRepository = new InMemoryNicknameClaimRepository();
  fixedTime = Temporal.Instant.from("2026-04-15T12:00:00Z");
  clock = new FixedClock(this.fixedTime);
  registerPlayerUseCase = new RegisterPlayerUseCase(
    this.nicknameClaimRepository,
    this.clock,
  );

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(GamePlatformWorld);
