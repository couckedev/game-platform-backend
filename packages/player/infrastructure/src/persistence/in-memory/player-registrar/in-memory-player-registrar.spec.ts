import { Nickname, Player } from '@player/interface-adapters';
import { describe, expect, it } from 'vitest';
import { InMemoryNicknameRegistry } from '../nickname-registry/in-memory-nickname-registry';
import { InMemoryPlayerRegistrar } from './in-memory-player-registrar';

describe(InMemoryPlayerRegistrar, () => {
  it('save player and nickname in same transaction', () => {
    const reservedNicknames = new Set<string>();
    const players = new Map<string, Player>();
    const nickname = Nickname.create('nickname');
    const player = new Player('some-player-id', 'some-external-id', nickname);
    const nicknameRegistry = new InMemoryNicknameRegistry(reservedNicknames);
    const playerRegistrar = new InMemoryPlayerRegistrar(
      reservedNicknames,
      players,
    );

    playerRegistrar.register(player);

    expect(nicknameRegistry.isAlreadyTaken(nickname)).toBeTruthy();
    expect(players.get(player.playerId)).toStrictEqual(player);
  });
});
