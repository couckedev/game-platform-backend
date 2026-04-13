import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';

export interface AppWorld {
  // Ajouter ici les propriétés partagées entre steps
}

export class GamePlatformWorld extends World implements AppWorld {
  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(GamePlatformWorld);
