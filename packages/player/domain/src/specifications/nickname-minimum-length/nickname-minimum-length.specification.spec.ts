import { describe } from "vitest";
import { NicknameMinimumLength } from "./nickname-minimum-length.specification";

describe("Nickname minimum length specification", () => {
  describe("isSatisfiedBy", () => {
    it("should return false if given nickname length does not satisfy nickname minimum length", () => {
      const nicknameValue = "nic";

      const meetsMinimumLength =
        NicknameMinimumLength.isSatisfiedBy(nicknameValue);

      expect(meetsMinimumLength).toBeFalsy();
    });

    it("should return true if given nickname length satisfy nickname minimum length", () => {
      const nicknameValue = "nickname";

      const meetsMinimumLength =
        NicknameMinimumLength.isSatisfiedBy(nicknameValue);

      expect(meetsMinimumLength).toBeTruthy();
    });

    it("should return true if given nickname length is exactly nickname maximum length", () => {
      const nicknameValue = "nickn";

      const meetsMinimumLength =
        NicknameMinimumLength.isSatisfiedBy(nicknameValue);

      expect(meetsMinimumLength).toBeTruthy();
    });
  });
});
