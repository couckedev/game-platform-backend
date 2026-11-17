export type PlayerAuthenticationViewModel =
  | {
      status: 'FOUND';
      authenticatedPlayer: {
        nickname: string;
      };
    }
  | { status: 'NOT_FOUND' };
