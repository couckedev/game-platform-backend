import { describe, expect, it } from 'vitest';
import { NicknameTooShortError } from '../../errors';
import { Nickname } from './nickname-value-object';

describe(Nickname.name, () => {
  it('creates nickname object containing nickname value', () => {
    const nicknameValue = 'nickname';

    const nicknameValueObject = Nickname.create(nicknameValue);

    expect(nicknameValueObject.value).toStrictEqual(nicknameValue);
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
    const nicknameValueObjectCreation = () => Nickname.create(nicknameValue);

    expect(nicknameValueObjectCreation).toThrow(new NicknameTooShortError());
  });
});
