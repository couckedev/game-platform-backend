import { World, setWorldConstructor } from '@cucumber/cucumber';
import type { IWorldOptions } from '@cucumber/cucumber';

export interface AppWorld {
  // Ajouter ici les propriétés partagées entre steps
}

export class GamePlatformWorld extends World implements AppWorld {
  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(GamePlatformWorld);
