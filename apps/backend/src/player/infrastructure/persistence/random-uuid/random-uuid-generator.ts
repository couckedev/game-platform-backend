import { randomUUID } from 'node:crypto';
import { UniqueIdGenerator } from '@/player/domain';

export class RandomUuidGenerator implements UniqueIdGenerator {
  generate(): string {
    return randomUUID();
  }
}
