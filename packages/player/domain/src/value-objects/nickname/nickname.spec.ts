import { describe, expect, it } from 'vitest';
import { NicknameTooShortError } from '../../errors/nickname';
import { Nickname } from './nickname';

describe(Nickname, () => {
  it('creates nickname object if nickname is 5 characters long', () => {
    const nicknameValue = '12345';

    const nickname = Nickname.create(nicknameValue);

    expect(nickname.value).toStrictEqual(nicknameValue);
  });
  it('creates nickname object if nickname is 6 characters long', () => {
    const nicknameValue = '123456';

    const nickname = Nickname.create(nicknameValue);

    expect(nickname.value).toStrictEqual(nicknameValue);
  });
  it('fails to create nickname object if nickname is 4 characters long', () => {
    const nicknameValue = '1234';

    const nicknameCreation = () => Nickname.create(nicknameValue);

    expect(nicknameCreation).toThrow(new NicknameTooShortError(nicknameValue));
  });
  it('fails to create nickname object if nickname is 3 characters long', () => {
    const nicknameValue = '123';

    const nicknameCreation = () => Nickname.create(nicknameValue);

    expect(nicknameCreation).toThrow(new NicknameTooShortError(nicknameValue));
  });
});
