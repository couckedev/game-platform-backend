import { Given, When, Then } from "@cucumber/cucumber";
import { strict as assert } from "node:assert";
import { GamePlatformWorld } from "../../support/world";
import {
  NicknameRejectionReason,
  RegisterPlayerRequest,
} from "player-contracts";
import { BusinessError } from "@couckedev/ddd-core";

// -- Background --

Given<GamePlatformWorld>(
  "a player is authenticated with external account",
  function () {
    this.externalAccountId = "current-external-account-id";
  },
);

Given<GamePlatformWorld>(
  "this player does not yet exist on the game platform",
  function () {
    this.playerId = "new-player-id";
  },
);

// -- Given --

Given<GamePlatformWorld>(
  "nickname {string} has been provided",
  function (nickname: string) {
    this.nickname = nickname;
  },
);

Given<GamePlatformWorld>(
  "nickname {string} is already claimed by player with player id {string}",
  async function (nickname: string, playerId: string) {
    await this.registerPlayerUseCase.execute({
      nickname,
      playerId,
    });
  },
);

// -- When --

When<GamePlatformWorld>("registration is requested", async function () {
  try {
    const request: RegisterPlayerRequest = {
      playerId: this.playerId,
      nickname: this.nickname,
      externalAccountid: this.externalAccountId,
    };
    await this.playerApiController.register(request);
    this.registrationError = null;
  } catch (error) {
    this.registrationError = error as BusinessError;
  }
});

// -- Then --

Then<GamePlatformWorld>("registration will be rejected", function () {
  assert.notEqual(
    this.registrationError,
    null,
    "Expected registration to be rejected",
  );
});

Then<GamePlatformWorld>(
  "registration will be rejected because nickname does not contain 3 letters at least",
  function () {
    assert.equal(
      this.registrationError?.code,
      NicknameRejectionReason.TooFewLetters,
    );
  },
);

Then<GamePlatformWorld>(
  "registration will be rejected because nickname contains invalid characters",
  function () {
    assert.equal(
      this.registrationError?.code,
      NicknameRejectionReason.InvalidCharacters,
    );
  },
);

Then<GamePlatformWorld>(
  "registration will be rejected because nickname is too short",
  function () {
    assert.equal(
      this.registrationError?.code,
      NicknameRejectionReason.TooShort,
    );
  },
);

Then<GamePlatformWorld>(
  "registration will be rejected because nickname is too long",
  function () {
    assert.equal(this.registrationError?.code, NicknameRejectionReason.TooLong);
  },
);
