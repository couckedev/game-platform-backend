import type { ClockPort } from "shared-time";

export class FixedClock implements ClockPort {
  constructor(private readonly instant: Temporal.Instant) {}

  now(): Temporal.Instant {
    return this.instant;
  }
}