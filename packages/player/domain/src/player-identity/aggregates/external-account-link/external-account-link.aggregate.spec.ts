import { describe } from "vitest";
import { ExternalAccountId } from "../../value-objects/external-account-id.value-object";
import { ExternalAccountLink } from "./external-account-link.aggregate";
import { PlayerId } from "../../value-objects/player-id.value-object";

describe("External account aggregate", () => {
  describe("isLinkedTo", () => {
    it('should create link between external account and player internal account', () => {
        const externalAccountId = new ExternalAccountId('external account id');
        const playerId = new PlayerId('player id');        
        const externalAccount = new ExternalAccountLink(externalAccountId, playerId);

        const isLinkedTo = externalAccount.isLinkedTo();

        expect(isLinkedTo).toStrictEqual(playerId);
    })
  });
  
  describe("aggregateId", () => {
    it('should use external account id value as aggregate id', () => {
        const externalAccountId = new ExternalAccountId('external account id');
        const playerId = new PlayerId('player id');   

        const externalAccount = new ExternalAccountLink(externalAccountId, playerId);

        expect(externalAccount.aggregateId).toStrictEqual(externalAccountId.value);
    })
  });
});
