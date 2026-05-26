import { Timestamp } from "shared-kernels-time";

import type { GamePlatformWorld } from "./world";

export async function setupApp(this: GamePlatformWorld): Promise<void> {
  this.reset(Timestamp.fromISOString("2026-04-15T12:00:00Z"));
}