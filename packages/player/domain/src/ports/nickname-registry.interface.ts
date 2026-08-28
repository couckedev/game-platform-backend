import type { Nickname } from '../value-objects';

export interface NicknameRegistry {
  isAlreadyTaken(nickname: Nickname): boolean | Promise<boolean>;
}
