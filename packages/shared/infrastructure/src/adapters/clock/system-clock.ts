import type { ClockPort } from "shared-kernels-time";
import { Timestamp } from "shared-kernels-time";

export class SystemClock implements ClockPort {
  now(): Timestamp {
    return Timestamp.fromISOString(new Date().toISOString());
  }
}
