import { describe } from "vitest";
import { PlayerId } from "../../value-objects/player-id.value-object";
import { PlayerAccount } from "./player-account.aggregate";
import { PlayerAccountCreatedEvent } from "../../events/player-account/player-account-created.domain-event";

describe("Player account aggregate", () => {
  describe("create", () => {
    it("should produce player account created event", () => {
      const playerId = new PlayerId("player id");
      const now = Temporal.Instant.from("2026-04-15T12:00:00Z");

      const playerAccount = PlayerAccount.create(playerId, now);

      const playerAccountCreatedEvent = new PlayerAccountCreatedEvent(
        playerId,
        now,
      );
      expect(playerAccount.getUncommittedEvents()).toContainEqual(
        playerAccountCreatedEvent,
      );
    });

    it("should set ACTIVE status on player account", () => {
      const playerId = new PlayerId("player id");
      const now = Temporal.Instant.from("2026-04-15T12:00:00Z");

      const playerAccount = PlayerAccount.create(playerId, now);

      expect(playerAccount.isActive()).toBeTruthy();
    });
  });

  describe("aggregateId", () => {
    it("should use player id value as aggregate id", () => {
      const playerId = new PlayerId("player id");

      const playerAccount = new PlayerAccount(playerId);

      expect(playerAccount.aggregateId).toStrictEqual(playerId.value);
    });
  });
});
