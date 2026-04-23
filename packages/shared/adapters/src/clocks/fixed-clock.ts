import type { ClockPort, Timestamp } from "shared-time";

export class FixedClock implements ClockPort {
  constructor(public readonly fixedTime: Timestamp) {}

  now(): Timestamp {
    return this.fixedTime;
  }
}