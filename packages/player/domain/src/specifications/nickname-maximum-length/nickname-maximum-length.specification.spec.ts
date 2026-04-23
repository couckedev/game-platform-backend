import { describe } from "vitest";
import { NicknameMaximumLength } from "./nickname-maximum-length.specification";

describe("Nickname maximum length specification", () => {
  describe("isSatisfiedBy", () => {
    it("should return false if given nickname length does not satisfy nickname maximum length", () => {
      const nicknameValue = "_nickname_is_too_long_";

      const meetsMaximumLength = NicknameMaximumLength.isSatisfiedBy(nicknameValue);

      expect(meetsMaximumLength).toBeFalsy();
    });

    it("should return true if given nickname length satisfy nickname maximum length", () => {
      const nicknameValue = "nickname";

      const meetsMaximumLength = NicknameMaximumLength.isSatisfiedBy(nicknameValue);

      expect(meetsMaximumLength).toBeTruthy();
    });

    it("should return true if given nickname length is exactly nickname maximum length", () => {
      const nicknameValue = "nicknamenicknamenick";

      const meetsMaximumLength  = NicknameMaximumLength.isSatisfiedBy(nicknameValue);

      expect(meetsMaximumLength).toBeTruthy();
    });
  });
});
