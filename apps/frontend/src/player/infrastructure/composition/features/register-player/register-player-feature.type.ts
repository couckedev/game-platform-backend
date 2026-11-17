import type {
  PlayerRegistrationViewModel,
  RegisterPlayerRequest,
} from '@/player/interface-adapters/features/register-player';

export type RegisterPlayerFeature = (request: RegisterPlayerRequest) => PlayerRegistrationViewModel;
