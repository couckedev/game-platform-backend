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
    const externalAccountId = 'external-account-id';

    const viewModel = await playerTestingModule.registerPlayer(
      nickname,
      externalAccountId,
    );

    expect(viewModel).toStrictEqual({ status: 'SUCCESS' });
  });

  it.each([
    { nickname: '' },
    { nickname: 'n' },
    { nickname: 'ni' },
    { nickname: 'nic' },
    { nickname: 'nick' },
  ])('fails if nickname is shorter than 5 characters', async ({ nickname }) => {
    const externalAccountId = 'external-account-id';

    const viewModel = await playerTestingModule.registerPlayer(
      nickname,
      externalAccountId,
    );

    expect(viewModel).toStrictEqual({
      status: 'FAILURE',
      rejectionReason: 'NICKNAME_TOO_SHORT',
    });
  });

  it.each([
    { nickname: '012345678901234567890' },
    { nickname: '0123456789012345678901' },
    { nickname: '01234567890123456789012' },
  ])('fails if nickname is longer than 20 characters', async ({ nickname }) => {
    const externalAccountId = 'external-account-id';

    const viewModel = await playerTestingModule.registerPlayer(
      nickname,
      externalAccountId,
    );

    expect(viewModel).toStrictEqual({
      status: 'FAILURE',
      rejectionReason: 'NICKNAME_TOO_LONG',
    });
  });

  it.each([
    { nickname: '1234a' },
    { nickname: 'ab12345' },
    { nickname: '123456789' },
  ])(
    'fails if nickname does not contain 3 letters at least',
    async ({ nickname }) => {
      const externalAccountId = 'external-account-id';

      const viewModel = await playerTestingModule.registerPlayer(
        nickname,
        externalAccountId,
      );

      expect(viewModel).toStrictEqual({
        status: 'FAILURE',
        rejectionReason: 'NICKNAME_TOO_FEW_LETTERS',
      });
    },
  );

  it.each([
    { nickname: 'abcdefù' },
    { nickname: 'abc123_-$*ù' },
    { nickname: 'abc123./:!' },
  ])(
    'fails if nickname contain does not contain only letters, digits, hyphens and underscores',
    async ({ nickname }) => {
      const externalAccountId = 'external-account-id';

      const viewModel = await playerTestingModule.registerPlayer(
        nickname,
        externalAccountId,
      );

      expect(viewModel).toStrictEqual({
        status: 'FAILURE',
        rejectionReason: 'NICKNAME_CONTAINS_FORBIDDEN_CHARACTERS',
      });
    },
  );

  it('fails if nickname is already taken by another player', async () => {
    const externalAccountId = 'external-account-id';
    const existingNickname = 'nickname';
    await playerTestingModule.registerPlayer(
      existingNickname,
      externalAccountId,
    );

    const viewModel = await playerTestingModule.registerPlayer(
      existingNickname,
      externalAccountId,
    );
    expect(viewModel).toStrictEqual({
      status: 'FAILURE',
      rejectionReason: 'NICKNAME_ALREADY_TAKEN',
    });
  });
});
