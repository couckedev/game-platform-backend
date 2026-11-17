import userEvent from '@testing-library/user-event';
import { type RenderResult, render, screen } from '@testing-library/vue';
import { createPinia } from 'pinia';
import { beforeEach, describe, it } from 'vitest';
import { createMemoryHistory } from 'vue-router';
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
  const router = createAppRouter(createMemoryHistory());
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
  const signInNavigationLink = screen.getByTestId('sign-in-navigation-link');
  await userEvent.click(signInNavigationLink);
}

async function clickOnGoogleSignInButton() {
  const signInWithGoogleButton = screen.getByTestId('sign-in-with-google-button');
  await userEvent.click(signInWithGoogleButton);
}

async function fillAndSubmitRegistrationForm(nickname: string) {
  const nicknameInput = screen.getByTestId('registration-form-nickname-input');
  await userEvent.type(nicknameInput, nickname);
  const registrationFormSubmitButton = screen.getByTestId('registration-form-submit-button');
  await userEvent.click(registrationFormSubmitButton);
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
      },
    });
    app = await openApp(authentication);
  });

  afterEach(async () => {
    app.unmount();
  });

  it('shows login page when sign-in navigation link is clicked', async () => {
    await goToSignInPage();

    await expect(screen.findByTestId('sign-in-page')).resolves.toBeInstanceOf(HTMLElement);
  });

  it('shows registration form if unregistered user has signed in with google', async () => {
    await goToSignInPage();

    await clickOnGoogleSignInButton();
    authenticationServer.authenticate();
    app = await openApp(authentication);

    expect(screen.getByTestId('player-registration-form')).toBeInstanceOf(HTMLElement);
  });

  it('shows registered player nickname on main navigation if valid registration form is submitted', async () => {
    await goToSignInPage();
    await clickOnGoogleSignInButton();
    authenticationServer.authenticate();
    app = await openApp(authentication);

    await fillAndSubmitRegistrationForm('nickname123');

    const nicknameOnMainNavigation = screen.getByTestId(
      'main-navigation-authenticated-player-nickname',
    );
    expect(nicknameOnMainNavigation.textContent).toStrictEqual('nickname123');
  });
});
