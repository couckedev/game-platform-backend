import { Given, When, Then } from "@cucumber/cucumber";
import { strict as assert } from "node:assert";
import type { GamePlatformWorld } from "../../support/world";
import { Nickname, NicknameClaim } from "player-domain";
import { PlayerId } from "../../../packages/player/domain/src/player-identity";

// -- Background --

Given<GamePlatformWorld>(
  "player has completed authentication flow on identity provider",
  function () {
    this.externalAccountid = "current-external-account-id";
  },
);

Given<GamePlatformWorld>("player id has been generated", function () {
  this.playerId = "current-player-id";
});

// -- Given --

Given<GamePlatformWorld>(
  "nickname typed by visitor is {string}",
  function (nickname: string) {
    this.nickname = nickname;
  },
);

Given<GamePlatformWorld>(
  "nickname {string} is already claimed by player with player id {string}",
  async function (nickname: string, playerId: string) {
    const nicknameClaim = new NicknameClaim(Nickname.create(nickname));
    nicknameClaim.claim(new PlayerId(playerId), this.fixedTime);
    await this.nicknameClaimRepository.save(nicknameClaim);
  },
);

// -- When --

When<GamePlatformWorld>("registration is requested", async function () {
  try {
    await this.registerPlayerUseCase.execute({
      playerId: this.playerId,
      nickname: this.nickname,
    });
    this.registrationError = null;
  } catch (error) {
    this.registrationError = error as Error;
  }
});

// -- Then --

Then<GamePlatformWorld>("registration should be rejected", function () {
  assert.notEqual(
    this.registrationError,
    null,
    "Expected registration to be rejected",
  );
});

Then<GamePlatformWorld>(
  "error message should be {string}",
  function (expectedMessage: string) {
    assert.equal(this.registrationError?.message, expectedMessage);
  },
);

