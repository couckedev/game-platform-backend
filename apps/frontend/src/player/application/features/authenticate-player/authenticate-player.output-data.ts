export type AuthenticatePlayerOutputData =
  | { status: 'NOT_FOUND' }
  | {
      status: 'FOUND';
      authenticatedPlayer: {
        nickname: string;
      };
    };
