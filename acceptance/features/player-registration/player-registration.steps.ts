import { Given, When, Then } from "@cucumber/cucumber";
import { strict as assert } from "node:assert";
import type { GamePlatformWorld } from "../../support/world";
import type { BusinessError } from "@couckedev/ddd-core";
import { type RegisterPlayerInput } from "player-application";
import { Nickname, NicknameRejectionReason, Player, PlayerId } from "player-domain";

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
  "nickname {string} is already used by another player",
  async function (nickname: string) {
    const playerId = PlayerId.create("player-id");
    const nicknameVO = Nickname.create(nickname);
    const createdAt = this.requireClock().now();
    const existingPlayer = Player.register(playerId, nicknameVO, createdAt);
    const playerRepository = this.requirePlayerRepository();
    await playerRepository.save(existingPlayer);
  },
);

// -- When --

When<GamePlatformWorld>("registration is requested", async function () {
  try {
    const registerPlayerInput: RegisterPlayerInput = {
      playerId: this.requirePlayerId(),
      nickname: this.requireNickname(),
    };
    await this.requireRegisterPlayerUseCase().execute(registerPlayerInput);
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

Then<GamePlatformWorld>(
  "player with nickname {string} will be created",
  async function (nickname: string) {
    const playerId = PlayerId.create(this.requirePlayerId());
    const playerRepository =
      this.requirePlayerRepository();
    const player =
      await playerRepository.load(playerId);
    assert.equal(player?.nickname.value, nickname);
  },
);

Then<GamePlatformWorld>(
  "registration is rejected because nickname is already used",
  function () {
    assert.equal(
      this.registrationError?.code,
      NicknameRejectionReason.AlreadyUsed,
    );
  },
);

