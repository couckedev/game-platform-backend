import { Nickname } from '../value-objects';

export interface NicknameRegistry {
  register(nickname: Nickname): void;
}
