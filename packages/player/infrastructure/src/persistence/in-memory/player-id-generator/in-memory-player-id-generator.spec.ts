import { describe, expect, it } from 'vitest';
import { InMemoryPlayerIdGenerator } from './in-memory-player-id-generator';

describe(InMemoryPlayerIdGenerator, () => {
  it('return internal id', () => {
    const playerId = 'some-player-id';
    const playerIdGenerator = new InMemoryPlayerIdGenerator();
    playerIdGenerator.playerId = playerId;

    const generatedId = playerIdGenerator.generate();

    expect(generatedId).toStrictEqual(playerId);
  });

  it('fail to return internal id if it has not been set before', () => {
    const playerIdGenerator = new InMemoryPlayerIdGenerator();

    const generation = () => playerIdGenerator.generate();

    expect(generation).toThrow(new Error('Player id has not been set'));
  });
});
