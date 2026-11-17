import type { Player } from '../entities';
import type { NicknameRegistrationRejectionReason } from '../errors';

type PlayerRegistrationResult =
  | { status: 'SUCCESS' }
  | { status: 'FAILURE'; error: NicknameRegistrationRejectionReason };

export interface PlayerRepository {
  register(player: Player): PlayerRegistrationResult;
  getCurrentPlayer(): Player | null;
}
