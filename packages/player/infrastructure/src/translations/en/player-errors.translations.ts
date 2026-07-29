import { Nickname } from '@player/interface-adapters';

export const PLAYER_ERRORS = {
  NICKNAME_TOO_SHORT: `Nickname must be at least ${Nickname.MINIMUM_LENGTH} characters long`,
} as const;
