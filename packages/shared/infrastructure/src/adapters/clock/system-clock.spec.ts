import { describe, expect, it } from "vitest";
import { SystemClock } from "./system-clock";
import { Timestamp } from "shared-kernels-time";

describe("SystemClock", () => {
  describe("now", () => {
    it("should return a Timestamp", () => {
      const clock = new SystemClock();

      const result = clock.now();

      expect(result).toBeInstanceOf(Timestamp);
    });

    it("should return a timestamp close to the current time", () => {
      const before = Date.now();
      const clock = new SystemClock();

      const result = clock.now();

      const after = Date.now();
      const resultMs = new Date(result.value).getTime();
      expect(resultMs).toBeGreaterThanOrEqual(before);
      expect(resultMs).toBeLessThanOrEqual(after);
    });

    it("should return non-decreasing timestamps on successive calls", () => {
      const clock = new SystemClock();

      const first = clock.now();
      const second = clock.now();

      const firstMs = new Date(first.value).getTime();
      const secondMs = new Date(second.value).getTime();
      expect(secondMs).toBeGreaterThanOrEqual(firstMs);
    });
  });
});
