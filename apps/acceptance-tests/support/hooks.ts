import { Before } from "@cucumber/cucumber";
import { setupApp } from "./app.setup";
import type { GamePlatformWorld } from "./world";

Before(async function (this: GamePlatformWorld) {
  await setupApp.call(this);
});
