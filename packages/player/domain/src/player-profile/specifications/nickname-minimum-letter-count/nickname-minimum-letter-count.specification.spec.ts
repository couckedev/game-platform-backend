import { describe } from "vitest";
import { NicknameMinimumLetterCount } from "./nickname-minimum-letter-count.specification";

describe("Nickname minimum letter count specification", () => {
  describe("isSatisfiedBy", () => {
    it("should return false if given nickname does not contain enough letter", () => {
      const nicknameValue = "a-b";

      const meetsMinimumLetterCount =
        NicknameMinimumLetterCount.isSatisfiedBy(nicknameValue);

      expect(meetsMinimumLetterCount).toBeFalsy();
    });

    it("should return true if given nickname contains enough letter", () => {
      const nicknameValue = "a-b-c";

      const meetsMinimumLetterCount =
        NicknameMinimumLetterCount.isSatisfiedBy(nicknameValue);

      expect(meetsMinimumLetterCount).toBeTruthy();
    });
  });
});
