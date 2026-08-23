import { Nickname, Player } from '@player/interface-adapters';
import { describe, expect, it } from 'vitest';
import { InMemoryPlayerRepository } from './in-memory-player-repository';

describe(InMemoryPlayerRepository, () => {
  it('returns player matching external account id', () => {
    const players = new Map<string, Player>();
    const player = new Player(
      'some-player-id',
      'some-external-account-id',
      Nickname.create('nickname'),
    );
    players.set(player.playerId, player);
    const playerRepository = new InMemoryPlayerRepository(players);

    const foundPlayer = playerRepository.findByExternalAccountId(
      player.externalAccountId,
    );

    expect(foundPlayer).toStrictEqual(player);
  });

  it('return null if external account id does not match a player', () => {
    const players = new Map<string, Player>();
    const playerRepository = new InMemoryPlayerRepository(players);

    const find = playerRepository.findByExternalAccountId(
      'some-external-account-id',
    );

    expect(find).toBeNull();
  });
});
