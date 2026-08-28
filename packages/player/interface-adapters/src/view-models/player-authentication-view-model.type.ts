export type PlayerAuthenticationViewModel =
  | {
      status: 'FOUND';
      nickname: string;
    }
  | { status: 'NOT_FOUND' };
