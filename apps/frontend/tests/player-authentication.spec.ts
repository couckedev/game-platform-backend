import userEvent from '@testing-library/user-event';
import { type RenderResult, render, screen, within } from '@testing-library/vue';
import { createPinia } from 'pinia';
import { beforeEach, describe, it } from 'vitest';
import { createWebHistory } from 'vue-router';
import { createAppPlugin } from '@/app/bootstrap/bootstrap-app-plugin';
import App from '@/app/components/App.vue';
import { createAppRouter } from '@/app/router';
import {
  type Authentication,
  createAuthentication,
} from '@/player/infrastructure/authentication/common';
import {
  InMemoryAuthenticationServer,
  InMemoryAuthenticationStatusResolver,
} from '@/player/infrastructure/authentication/in-memory';

async function openApp(authentication: Authentication) {
  const store = createPinia();
  const router = createAppRouter(createWebHistory());
  const plugin = createAppPlugin({
    store,
    router,
    authentication,
  });
  const app = render(App, {
    global: {
      plugins: [plugin],
    },
  });
  await router.push('/');
  await router.isReady();
  return app;
}

async function goToSignInPage() {
  const mainNavigation = screen.getByRole('navigation', { name: 'Main navigation' });
  const signInNavigationLink = within(mainNavigation).getByRole('link', { name: 'Sign in' });
  await userEvent.click(signInNavigationLink);
}

async function clickOnGoogleSignInButton() {
  const signInWithGoogleButton = screen.getByRole('button', { name: 'Sign in with Google' });
  await userEvent.click(signInWithGoogleButton);
}

describe('Player authentication', () => {
  let app: RenderResult;
  let authenticationServer: InMemoryAuthenticationServer;
  let authentication: Authentication;
  beforeEach(async () => {
    authenticationServer = new InMemoryAuthenticationServer();
    authentication = createAuthentication({
      authenticationStatusResolver: new InMemoryAuthenticationStatusResolver(authenticationServer),
      onSignInStarted: async () => {
        app.unmount();
        authenticationServer.authenticate();
        app = await openApp(authentication);
      },
    });
    app = await openApp(authentication);
  });

  afterEach(async () => {
    app.unmount();
  });

  it('shows login page whensign-in navigation link is clicked', async () => {
    await goToSignInPage();

    expect(window.location.pathname).toBe('/sign-in');
  });

  it('shows registration form if unregistered user has signed in with google', async () => {
    await goToSignInPage();

    await clickOnGoogleSignInButton();

    expect(screen.getByRole('form', { name: /Register on Game Platform/i })).toBeInstanceOf(
      HTMLElement,
    );
  });

  it('hides sign-in button if unregistered user has signed in', async () => {
    await goToSignInPage();

    await clickOnGoogleSignInButton();

    expect(() => screen.getByRole('button', { name: 'Sign in with Google' })).toThrow();
  });
});
