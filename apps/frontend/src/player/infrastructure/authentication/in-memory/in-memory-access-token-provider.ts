import type { AccessTokenProvider } from '../common';

export class InMemoryAccessTokenProvider implements AccessTokenProvider {
  constructor(private readonly _token: string) {}

  requireAccessToken(): string {
    if (!this._token) {
      throw new Error('User is not signed in');
    }
    return this._token;
  }
}
