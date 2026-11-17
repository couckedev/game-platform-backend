import axios from 'axios';
import { HttpResponse, http } from 'msw/http';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { AxiosAuthenticationStatusResolver } from './axios-authentication-status-resolver';

describe(AxiosAuthenticationStatusResolver.name, () => {
  const server = setupServer();
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('returns false if authentication status restoration replies with 401', async () => {
    const authenticationServerApi = axios.create({
      baseURL: 'http://localhost/authentication',
    });
    const authenticationStatusResolver = new AxiosAuthenticationStatusResolver(
      authenticationServerApi,
    );
    server.use(
      http.get('http://localhost/authentication/me', () => new HttpResponse(null, { status: 401 })),
    );

    await authenticationStatusResolver.resolve();

    expect(authenticationStatusResolver.isAuthenticated).toBeFalsy();
  });

  it('returns true if authentication status restoration replies with 204', async () => {
    const authenticationServerApi = axios.create({
      baseURL: 'http://localhost/authentication',
    });
    const authenticationStatusResolver = new AxiosAuthenticationStatusResolver(
      authenticationServerApi,
    );
    server.use(
      http.get(
        'http://localhost/authentication/me',
        () =>
          new HttpResponse(null, {
            status: 204,
            headers: {
              'Set-Cookie': 'session_id=fake_session_id; HttpOnly; Path=/; SameSite=Lax',
            },
          }),
      ),
    );

    await authenticationStatusResolver.resolve();

    expect(authenticationStatusResolver.isAuthenticated).toBeTruthy();
  });

  it('throws error if authentication status restoration returns unexpected http response', async () => {
    const authenticationServerApi = axios.create({
      baseURL: 'http://localhost/authentication',
    });
    const authenticationStatusResolver = new AxiosAuthenticationStatusResolver(
      authenticationServerApi,
    );
    server.use(
      http.get(
        'http://localhost/authentication/me',
        () =>
          new HttpResponse(null, {
            status: 200,
            headers: {
              'Set-Cookie': 'session_id=fake_session_id; HttpOnly; Path=/; SameSite=Lax',
            },
          }),
      ),
    );

    await expect(authenticationStatusResolver.resolve()).rejects.toThrow(
      new Error('Authentication status resolver returns unexpected response'),
    );
  });
});
