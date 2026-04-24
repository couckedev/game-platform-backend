import { describe, expect, it } from "vitest";
import { Nickname } from "./nickname.value-object";
import { NicknameTooShortError } from "../../errors/nickname-too-short.error";
import { NicknameTooLongError } from "../../errors/nickname-too-long.error";
import { NicknameInvalidCharactersError } from "../../errors/nickname-invalid-characters.error";
import { NicknameTooFewletters } from "../../errors/nickname-too-few-letters.error";

describe("Nickname VO", () => {
  describe("create", () => {
    it("should create new nickname VO if value is a valid nickname", () => {
      const nicknameValue = "-nickname_123-";

      const nicknameVO = Nickname.create(nicknameValue);

      expect(nicknameVO).toBeInstanceOf(Nickname);
      expect(nicknameVO.value).toStrictEqual(nicknameValue);
    });

    it("should fail to create nickname VO is nickname is too short", () => {
      const nicknameValue = "nic";

      const nicknameVOCreation = () => Nickname.create(nicknameValue);

      const expectedError = new NicknameTooShortError(nicknameValue);
      expect(nicknameVOCreation).toThrow(expectedError);
    });

    it("should fail to create nickname VO is nickname is too long", () => {
      const nicknameValue = "_nickname_is_too_long_";

      const nicknameVOCreation = () => Nickname.create(nicknameValue);

      const expectedError = new NicknameTooLongError(nicknameValue);
      expect(nicknameVOCreation).toThrow(expectedError);
    });

    it("should fail to create nickname VO is nickname contains forbidden characters", () => {
      const nicknameValue = "_nick-n@m€_$ù*^";

      const nicknameVOCreation = () => Nickname.create(nicknameValue);

      const expectedError = new NicknameInvalidCharactersError(
        nicknameValue,
      );
      expect(nicknameVOCreation).toThrow(expectedError);
    });

    it("should fail to create nickname VO is nickname does not contains enough letter", () => {
      const nicknameValue = "984984-_-848";

      const nicknameVOCreation = () => Nickname.create(nicknameValue);

      const expectedError = new NicknameTooFewletters(
        nicknameValue,
      );
      expect(nicknameVOCreation).toThrow(expectedError);
    });
  });

  describe('equals', () => {
    it('should return true if nickname has same value', () => {
      const nickname1 = Nickname.create('nickname1');
      const nickname2 = Nickname.create('nickname1');

      expect(nickname1.equals(nickname2)).toBeTruthy();
    })
    it('should return false if nickname has different value', () => {      
      const nickname1 = Nickname.create('nickname1');
      const nickname2 = Nickname.create('nickname2');

      expect(nickname1.equals(nickname2)).toBeFalsy();
    })
  })
});
