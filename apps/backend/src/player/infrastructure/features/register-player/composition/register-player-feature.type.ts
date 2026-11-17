import {
  PlayerRegistrationViewModel,
  RegisterPlayerRequest,
} from '@/player/interface-adapters/register-player';

export type RegisterPlayerFeature = (
  request: RegisterPlayerRequest,
) => Promise<PlayerRegistrationViewModel>;
