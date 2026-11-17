import type { AuthenticationStatusResolver } from '@/player/infrastructure/authentication/common';
import type { InMemoryAuthenticationServer } from './in-memory-authentication-server';

export class InMemoryAuthenticationStatusResolver implements AuthenticationStatusResolver {
  private _isAuthenticated = false;

  constructor(private readonly authenticationServer: InMemoryAuthenticationServer) {}

  async resolve(): Promise<void> {
    this._isAuthenticated = this.authenticationServer.isAuthenticated;
  }

  get isAuthenticated() {
    return this._isAuthenticated;
  }
}
