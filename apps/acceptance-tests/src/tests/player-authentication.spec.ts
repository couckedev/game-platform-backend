import type { PlayerTestingModule } from '@player/infrastructure/testing';
import { beforeAll, describe, expect, it } from 'vitest';
import { bootstrapAcceptanceTestsApplication } from '../bootstrap-acceptance-tests-application';

describe('Player authentication', () => {
  let playerTestingModule: PlayerTestingModule;

  beforeAll(() => {
    const bootstrap = bootstrapAcceptanceTestsApplication();
    playerTestingModule = bootstrap.playerTestingModule;
  });

  it('returns current player if exists', async () => {
    const externalAccountId = 'some-external-account-id';
    const nickname = 'nickname';
    await playerTestingModule.registerPlayer(nickname, externalAccountId);

    const viewModel =
      await playerTestingModule.authenticatePlayer(externalAccountId);

    expect(viewModel).toStrictEqual({ status: 'FOUND', nickname });
  });
});
