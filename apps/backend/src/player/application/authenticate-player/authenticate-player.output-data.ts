export type AuthenticatePlayerOutputData =
  | { status: 'FOUND'; currentPlayer: { nickname: string } }
  | { status: 'NOT_FOUND' };
