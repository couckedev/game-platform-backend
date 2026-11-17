import { assert, describe, expect, it } from 'vitest';
import { Nickname } from './nickname-value-object';

describe(Nickname.name, () => {
  it('creates nickname object containing nickname value', () => {
    const nicknameValue = 'nickname';

    const nicknameCreationResult = Nickname.create(nicknameValue);

    expect(nicknameCreationResult).toStrictEqual({
      status: 'SUCCESS',
      value: new Nickname(nicknameValue),
    });
  });

  it.each([
    { nicknameValue: 'n' },
    { nicknameValue: 'ni' },
    { nicknameValue: 'nic' },
    { nicknameValue: 'nick' },
    { nicknameValue: 'nickn' },
    { nicknameValue: 'nickna' },
    { nicknameValue: 'nicknam' },
  ])('fails to create nickname object if nickname value is too short', ({ nicknameValue }) => {
    const nicknameCreationResult = Nickname.create(nicknameValue);

    assert(nicknameCreationResult.status === 'FAILURE');
    expect(nicknameCreationResult.errors).toContainEqual('NICKNAME_TOO_SHORT');
  });

  it('fails to create nickname object if nickname value length is too long', () => {
    const tooLongNicknameValue = 'nicknamenicknamenickname';

    const nicknameCreationResult = Nickname.create(tooLongNicknameValue);

    assert(nicknameCreationResult.status === 'FAILURE');
    expect(nicknameCreationResult.errors).toContainEqual('NICKNAME_TOO_LONG');
  });
});
