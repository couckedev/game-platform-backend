import { Given, When/*, Then*/ } from "@cucumber/cucumber";
//import { strict as assert } from "node:assert";
import type { GamePlatformBackendWorld } from "../../world";

// -- Background --

Given<GamePlatformBackendWorld>(
  "a player is authenticated with a social account",
  function () {
    this.externalAccountId = "external-account-id";
  },
);

Given<GamePlatformBackendWorld>(
  "this player does not yet exist on the game platform",
  function () {
    this.playerId = "new-player-id";
  },
);



// -- Given --
Given<GamePlatformBackendWorld>(
  "nickname {nickname} has been provided",
  function (nickname: string) {
    this.providedNickname = nickname;
  },
);

// -- When --

When<GamePlatformBackendWorld>("registration is requested", function () {
  try {
    this.registerPlayerUseCase.execute({
      playerId: this.playerId ?? '',
      nickname: this.providedNickname ?? '',
      externalAccountId: this.externalAccountId ?? ''
    });
    this.registrationError = null;
  } catch (error) {
    if(error instanceof Error) {
      this.registrationError = error.message;
    }
  }
});

// -- Then --

/*Then<GamePlatformWorld>("registration should be rejected", function () {
  assert.notEqual(
    this.registrationError,
    null,
    "Expected registration to be rejected",
  );
});*/

