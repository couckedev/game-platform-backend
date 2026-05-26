import { World, setWorldConstructor } from "@cucumber/cucumber";
import type { IWorldOptions } from "@cucumber/cucumber";
import type { BusinessError } from "@couckedev/ddd-core";
import { RegisterPlayerUseCase } from "player-application";
import type { ClockPort, Timestamp } from "shared-kernels-time";
import { FixedClock, SilentLogger } from "shared-infrastructure";
import {
  InMemoryNicknameUniquenessChecker,
  InMemoryPlayerRepository,
  InMemoryExternalAccountIdUniquenessChecker,
} from "player-infrastructure";
import type {
  NicknameUniquenessCheckerPort,
  ExternalAccountIdUniquenessCheckerPort,
  Player,
  PlayerRepositoryPort,
} from "player-domain";

export class GamePlatformWorld extends World {
  playerId: string | null = null;
  externalAccountId: string | null = null;
  nickname: string | null = null;
  registrationError: BusinessError | null = null;
  clock: ClockPort | null = null;
  registerPlayerUseCase: RegisterPlayerUseCase | null = null;
  playerRepository: PlayerRepositoryPort | null = null;
  nicknameUniquenessChecker: NicknameUniquenessCheckerPort | null = null;
  externalAccountIdUniquenessChecker: ExternalAccountIdUniquenessCheckerPort | null = null;
  private players = new Map<string, Player>([]);

  constructor(options: IWorldOptions) {
    super(options);
  }

  reset(time: Timestamp): void {
    this.clock = new FixedClock(time);
    this.playerRepository = new InMemoryPlayerRepository(this.players);
    this.nicknameUniquenessChecker = new InMemoryNicknameUniquenessChecker(
      this.players,
    );
    this.externalAccountIdUniquenessChecker = new InMemoryExternalAccountIdUniquenessChecker(
      this.players,
    );
    this.registerPlayerUseCase = new RegisterPlayerUseCase(
      this.clock,
      this.requirePlayerRepository(),
      this.requireNicknameUniquenessChecker(),
      this.requireExternalAccountIdUniquenessChecker(),
      new SilentLogger(),
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
      throw new Error(
        `Register player use case must be initialized before use`,
      );
    }

    return this.registerPlayerUseCase;
  }

  requirePlayerId(): string {
    if (this.playerId === null) {
      throw new Error(`Player id must be initialized before use`);
    }

    return this.playerId;
  }

  requireNickname(): string {
    if (this.nickname === null) {
      throw new Error(`Nickname must be initialized before use`);
    }

    return this.nickname;
  }

  requireExternalAccountId(): string {
    if (this.externalAccountId === null) {
      throw new Error(`External account id must be initialized before use`);
    }

    return this.externalAccountId;
  }

  requirePlayerRepository(): PlayerRepositoryPort {
    if (this.playerRepository === null) {
      throw new Error(`Player repository must be initialized before use`);
    }

    return this.playerRepository;
  }

  requireNicknameUniquenessChecker(): NicknameUniquenessCheckerPort {
    if (this.nicknameUniquenessChecker === null) {
      throw new Error(`Nickname uniqueness checker must be initialized before use`);
    }

    return this.nicknameUniquenessChecker;
  }

  requireExternalAccountIdUniquenessChecker(): ExternalAccountIdUniquenessCheckerPort {
    if (this.externalAccountIdUniquenessChecker === null) {
      throw new Error(`External account id uniqueness checker must be initialized before use`);
    }

    return this.externalAccountIdUniquenessChecker;
  }
}

setWorldConstructor(GamePlatformWorld);
