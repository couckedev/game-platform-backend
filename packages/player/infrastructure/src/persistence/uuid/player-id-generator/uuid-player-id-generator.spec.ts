import { validate } from 'uuid';
import { describe, expect, it } from 'vitest';
import { UuidPlayerIdGenerator } from './uuid-player-id-generator';

describe(UuidPlayerIdGenerator, () => {
  it('generate valid uuid', () => {
    const playerIdGenerator = new UuidPlayerIdGenerator();

    const generated = playerIdGenerator.generate();

    expect(validate(generated)).toBeTruthy();
  });
});
