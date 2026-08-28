import type { PlayerTestingModule } from '@player/infrastructure/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { bootstrapAcceptanceTestsApplication } from '../bootstrap-acceptance-tests-application';

describe('Player authentication', () => {
  let playerTestingModule: PlayerTestingModule;

  beforeEach(() => {
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

  it('return status NOT_FOUND if current player cannot be found', async () => {
    const externalAccountId = 'some-external-account-id';

    const viewModel =
      await playerTestingModule.authenticatePlayer(externalAccountId);

    expect(viewModel).toStrictEqual({ status: 'NOT_FOUND' });
  });
});
