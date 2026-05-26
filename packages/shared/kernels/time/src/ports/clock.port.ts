import type { Timestamp } from "../value-objects/timestamp.value-object";

export interface ClockPort {
  now(): Timestamp;
}