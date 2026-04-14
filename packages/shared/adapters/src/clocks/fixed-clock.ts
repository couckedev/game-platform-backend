import type { ClockPort } from "shared-time";

export class FixedClock implements ClockPort {
  constructor(public readonly fixedTime: Temporal.Instant) {}

  now(): Temporal.Instant {
    return this.fixedTime;
  }
}