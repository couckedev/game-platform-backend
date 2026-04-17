import { describe } from "vitest";
import { Nickname } from "../../value-objects/nickname/nickname.value-object";
import { NicknameClaim } from "./nickname-claim.aggregate";
import { NicknameClaimedEvent } from "../../events/nickname-claim/nickname-claimed.domain-event";
import { PlayerId } from "../../../player-identity";

describe("Nickname claim aggregate", () => {
  describe("claim", () => {
    it("should produce nickname claimed domain event", () => {
      const nickname = Nickname.create("nickname");
      const claimer = new PlayerId('player id');
      const now = Temporal.Instant.from("2026-04-15T12:00:00Z");
      const nicknameClaim = new NicknameClaim(nickname);

      nicknameClaim.claim(claimer, now);

      const nicknameClaimedEvent = new NicknameClaimedEvent(nickname, claimer, now);
      expect(nicknameClaim.getUncommittedEvents()).toContainEqual(nicknameClaimedEvent)
    });
    
    it("should set nickname as reserved", () => {
      const nickname = Nickname.create("nickname");
      const claimer = new PlayerId('player id');
      const now = Temporal.Instant.from("2026-04-15T12:00:00Z");
      const nicknameClaim = new NicknameClaim(nickname);

      nicknameClaim.claim(claimer, now);

      expect(nicknameClaim.isReserved()).toBeTruthy();
    });
  });
});
