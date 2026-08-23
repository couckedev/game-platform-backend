import type { PlayerIdGenerator } from '@player/interface-adapters';
import { v4 } from 'uuid';

export class UuidPlayerIdGenerator implements PlayerIdGenerator {
  generate(): string {
    return v4();
  }
}
