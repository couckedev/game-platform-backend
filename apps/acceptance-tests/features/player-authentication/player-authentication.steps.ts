import assert from 'node:assert';
import { Given, Then, When } from '@cucumber/cucumber';
import type { GamePlatformFrontendWorld } from '../../support/world';

Given<GamePlatformFrontendWorld>(
  'user is authenticated with an external account',
  function () {
    this.sharedContext.authenticateUser();
  },
);

Given<GamePlatformFrontendWorld>(
  'user is not authenticated with an external account',
  () => {},
);

Given<GamePlatformFrontendWorld>(
  'player exists on game platform for this user',
  function () {
    this.playerContext.setAuthenticatedPlayer('nickname', 'some-player-id');
  },
);

When<GamePlatformFrontendWorld>(
  'player authentication is requested',
  function () {
    this.playerContext.authenticatePlayer();
  },
);

Then<GamePlatformFrontendWorld>('current player will be set', function () {
  const authenticatedPlayer = this.playerContext.getAuthenticatedPlayer();
  assert(authenticatedPlayer !== null, 'Expected some authenticated player');
  assert.deepStrictEqual(this.playerContext.currentPlayer, {
    nickname: authenticatedPlayer.nickname.value,
    playerId: authenticatedPlayer.playerId.value,
  });
});

Then<GamePlatformFrontendWorld>(
  'authentication status will be set as authenticated',
  function () {
    assert.deepStrictEqual(this.playerContext.authenticationStatus, {
      isAuthenticated: true,
    });
  },
);

Then<GamePlatformFrontendWorld>(
  'authentication status will be set as unauthenticated',
  function () {
    assert.deepStrictEqual(this.playerContext.authenticationStatus, {
      isAuthenticated: false,
    });
  },
);
