import type { PlayerTestingModule } from '@player/infrastructure/testing';
import { beforeAll, describe, expect, it } from 'vitest';
import { bootstrapAcceptanceTestsApplication } from '../bootstrap-acceptance-tests-application';

describe('Player registration', () => {
  let playerTestingModule: PlayerTestingModule;
  beforeAll(() => {
    const bootstrap = bootstrapAcceptanceTestsApplication();
    playerTestingModule = bootstrap.playerTestingModule;
  });

  it('succeeds if player registration request is valid', async () => {
    const nickname = 'nickname';

    const viewModel = playerTestingModule.registerPlayer(nickname);

    expect(viewModel).toStrictEqual({ status: 'SUCCESS' });
  });

  it.each([
    { nickname: '' },
    { nickname: 'n' },
    { nickname: 'ni' },
    { nickname: 'nic' },
    { nickname: 'nick' },
  ])('fails if nickname is shorter than 5 characters', ({ nickname }) => {
    const viewModel = playerTestingModule.registerPlayer(nickname);

    expect(viewModel).toStrictEqual({
      status: 'FAILURE',
      rejectionReason: 'NICKNAME_TOO_SHORT',
    });
  });
});
