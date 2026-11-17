export type PlayerAuthenticationViewModel =
  | { status: 'FOUND'; currentPlayer: { nickname: string } }
  | { status: 'NOT_FOUND' };
