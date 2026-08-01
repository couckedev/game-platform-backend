import type { Nickname } from '../value-objects';

export interface NicknameRegistry {
  reserve(nickname: Nickname): void | Promise<void>;
  isAlreadyTaken(nickname: Nickname): boolean | Promise<boolean>;
}
