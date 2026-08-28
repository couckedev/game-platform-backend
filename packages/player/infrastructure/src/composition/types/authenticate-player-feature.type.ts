import type { PlayerAuthenticationViewModel } from '@player/interface-adapters/view-models';

export type AuthenticatePlayerFeature = (
  externalAccountId: string,
) => Promise<PlayerAuthenticationViewModel>;
