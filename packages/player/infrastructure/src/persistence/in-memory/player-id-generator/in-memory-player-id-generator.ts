import type { PlayerIdGenerator } from '@player/interface-adapters';

export class InMemoryPlayerIdGenerator implements PlayerIdGenerator {
  private _playerId: string | null = null;

  set playerId(id: string) {
    this._playerId = id;
  }

  generate(): string {
    if (this._playerId === null) throw new Error('Player id has not been set');
    return this._playerId;
  }
}
