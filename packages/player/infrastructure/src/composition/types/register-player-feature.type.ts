import type { PlayerRegistrationViewModel } from '@player/interface-adapters/view-models';

export type RegisterPlayerFeature = (
  nickname: string,
) => Promise<PlayerRegistrationViewModel>;
