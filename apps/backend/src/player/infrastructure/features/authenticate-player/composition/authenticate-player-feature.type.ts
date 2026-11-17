import { AuthenticatedIdentity } from '@/player/infrastructure/authentication/common';

type PlayerAuthenticationViewModel =
  | { status: 'FOUND'; currentPlayer: { nickname: string } }
  | { status: 'NOT_FOUND' };

export type AuthenticatePlayerFeature = (
  identity: AuthenticatedIdentity,
) => Promise<PlayerAuthenticationViewModel>;
