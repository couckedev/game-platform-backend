import { EmptyExternalAccountIdError } from "../../errors/empty-account-id.error";
import { ExternalAccountId } from "./external-account-id.value-object";

describe("External account id VO", () => {
  describe("create", () => {
    it("should create new player id VO", () => {
      const playerIdValue = "external-account-id";

      const playerId = ExternalAccountId.create(playerIdValue);

      expect(playerId).toBeInstanceOf(ExternalAccountId);
      expect(playerId.value).toStrictEqual(playerIdValue);
    });
    
    it("should fail if value is empty", () => {
      const playerIdValue = "";

      const creation = () => ExternalAccountId.create(playerIdValue);

      const expectedError = new EmptyExternalAccountIdError();
      expect(creation).toThrow(expectedError);
    });
  });
});
