import { EmptyPlayerIdError } from "../../errors/empty-player-id.error";
import { PlayerId } from "./player-id.value-object";

describe("Player id VO", () => {
  describe("create", () => {
    it("should create new player id VO", () => {
      const playerIdValue = "player-id";

      const playerId = PlayerId.create(playerIdValue);

      expect(playerId).toBeInstanceOf(PlayerId);
      expect(playerId.value).toStrictEqual(playerIdValue);
    });
    
    it("should fail if value is empty", () => {
      const playerIdValue = "";

      const creation = () => PlayerId.create(playerIdValue);

      const expectedError = new EmptyPlayerIdError();
      expect(creation).toThrow(expectedError);
    });
  });
});
