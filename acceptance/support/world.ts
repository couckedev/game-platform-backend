import { World, setWorldConstructor } from "@cucumber/cucumber";
import type { IWorldOptions } from "@cucumber/cucumber";
import type { BusinessError } from '@couckedev/ddd-core';
import { RegisterPlayerUseCase } from 'player-application';
import { PlayerApiController } from 'player-adapters';

import {
  FixedClock,
} from "shared-adapters";

export class GamePlatformWorld extends World {
  playerId = "";
  externalAccountId = "";
  nickname = "";
  registrationError: BusinessError | null = null;

  fixedTime = Temporal.Instant.from("2026-04-15T12:00:00Z");
  clock = new FixedClock(this.fixedTime);
  registerPlayerUseCase = new RegisterPlayerUseCase(this.clock);
  playerApiController = new PlayerApiController(this.registerPlayerUseCase);
  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(GamePlatformWorld);
