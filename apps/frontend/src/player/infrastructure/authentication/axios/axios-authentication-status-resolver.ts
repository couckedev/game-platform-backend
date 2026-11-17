import { type Axios, HttpStatusCode, isAxiosError } from 'axios';
import type { AuthenticationStatusResolver } from '@/player/infrastructure/authentication/common';

export class AxiosAuthenticationStatusResolver implements AuthenticationStatusResolver {
  private _isAuthenticated = false;
  constructor(private readonly authenticationServerApi: Axios) {}

  async resolve() {
    try {
      const response = await this.authenticationServerApi.get('me');
      if (response.status === HttpStatusCode.NoContent) {
        this._isAuthenticated = true;
        return;
      }
      throw new Error('Authentication status resolver returns unexpected response');
    } catch (error) {
      if (isAxiosError(error) && error.status === HttpStatusCode.Unauthorized) {
        this._isAuthenticated = false;
        return;
      }
      throw error;
    }
  }

  get isAuthenticated() {
    return this._isAuthenticated;
  }
}
