import {
  Nickname,
  NicknameAlreadyTakenError,
} from '@player/interface-adapters';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryNicknameRegistry } from './in-memory-nickname-registry';

describe(InMemoryNicknameRegistry, () => {
  const reservedNicknames = new Set<string>();
  beforeEach(() => {
    reservedNicknames.clear();
  });

  it('reserve nickname on table if it does not exist', () => {
    const nickname = Nickname.create('nickname');
    const nicknameRegistry = new InMemoryNicknameRegistry(reservedNicknames);

    nicknameRegistry.reserve(nickname);

    expect(nicknameRegistry.isAlreadyTaken(nickname)).toBeTruthy();
  });

  it('fails to reserve nickname on table if nickname is already taken', async () => {
    const nickname = Nickname.create('nickname');
    const nicknameRegistry = new InMemoryNicknameRegistry(reservedNicknames);
    nicknameRegistry.reserve(nickname);

    const nicknameReservation = () => nicknameRegistry.reserve(nickname);

    expect(nicknameReservation).toThrow(
      new NicknameAlreadyTakenError(nickname.value),
    );
  });
});
