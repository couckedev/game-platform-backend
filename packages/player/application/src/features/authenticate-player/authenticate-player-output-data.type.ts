export type AuthenticatePlayerOutputData =
  | {
      status: 'FOUND';
      nickname: string;
    }
  | { status: 'NOT_FOUND' };
