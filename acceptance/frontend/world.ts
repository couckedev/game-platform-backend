import { World, setWorldConstructor } from "@cucumber/cucumber";
import type { IWorldOptions } from "@cucumber/cucumber";

export class GamePlatformFrontendWorld extends World {

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(GamePlatformFrontendWorld);
