import { World, setWorldConstructor } from "@cucumber/cucumber";
import type { IWorldOptions } from "@cucumber/cucumber";
import { RegisterPlayerUseCase } from 'player-application';

export class GamePlatformBackendWorld extends World {
  externalAccountId: string | null = null;
  providedNickname: string | null = null;
  playerId: string |null = null;
  registrationError: string |null = null;

  registerPlayerUseCase = new RegisterPlayerUseCase();

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(GamePlatformBackendWorld);
