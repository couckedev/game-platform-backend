import { World, setWorldConstructor } from "@cucumber/cucumber";
import type { IWorldOptions } from "@cucumber/cucumber";
import type { BusinessError } from '@couckedev/ddd-core';
import { RegisterPlayerUseCase } from 'player-application';

import {
  FixedClock,
} from "shared-adapters";
import type { ClockPort, Timestamp } from "shared-time";
import { InMemoryPlayerRepository } from "player-adapters";
import type { PlayerRepositoryPort } from 'player-domain';

export class GamePlatformWorld extends World {
  playerId: string | null = null;
  externalAccountId: string | null = null;
  nickname: string | null = null;
  registrationError: BusinessError | null = null;
  clock: ClockPort | null = null;
  registerPlayerUseCase: RegisterPlayerUseCase | null = null;
  playerRepository: PlayerRepositoryPort |null = null;

  fixedTime = Temporal.Instant.from("2026-04-15T12:00:00Z");
  clock = new FixedClock(this.fixedTime);
  registerPlayerUseCase = new RegisterPlayerUseCase(this.clock, this.playerRepository);
  constructor(options: IWorldOptions) {
    super(options);
  }

  reset(time: Timestamp): void {
    this.clock = new FixedClock(time);
    this.playerRepository = new InMemoryPlayerRepository();
    this.registerPlayerUseCase = new RegisterPlayerUseCase(
      this.clock,
      this.playerRepository,
    );
    this.playerId = null;
    this.externalAccountId = null;
    this.nickname = null;
  }

  requireClock(): ClockPort {
    if (this.clock === null) {
      throw new Error(`Clock must be initialized before use`);
    }

    return this.clock;
  }  

  requireRegisterPlayerUseCase(): RegisterPlayerUseCase {
    if (this.registerPlayerUseCase === null) {
      throw new Error(`Register player use case must be initialized before use`);
    }

    return this.registerPlayerUseCase;
  }

  requirePlayerId(): string {
    if(this.playerId === null) {
      throw new Error(`Player id must be initialized before use`);
    }

    return this.playerId;
  }

  requireNickname(): string {
    if(this.nickname === null) {
      throw new Error(`Nickname must be initialized before use`);
    }

    return this.nickname;
  }

  requireExternalAccountId(): string {
    if(this.externalAccountId === null) {
      throw new Error(`External account id must be initialized before use`);
    }

    return this.externalAccountId;
  }

  requirePlayerRepository(): PlayerRepositoryPort {
    if(this.playerRepository === null) {
      throw new Error(`Player repository must be initialized before use`);
    }

    return this.playerRepository;
  }
}

setWorldConstructor(GamePlatformWorld);
