import { Nickname } from '../value-objects';

export interface Player {
  id: string;
  externalAccountId: string;
  nickname: Nickname;
}
