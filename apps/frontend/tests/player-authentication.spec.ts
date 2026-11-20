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
  await userEvent.clear(nicknameInput);
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

  it.each([
    { nickname: 'n' },
    { nickname: 'ni' },
    { nickname: 'nic' },
    { nickname: 'nick' },
    { nickname: 'nickn' },
    { nickname: 'nickna' },
    { nickname: 'nicknam' },
  ])(
    'shows error on registration form nickname input if nickname is less than 8 characters long',
    async ({ nickname }) => {
      await goToSignInPage();
      await clickOnGoogleSignInButton();
      authenticationServer.authenticate();
      app = await openApp(authentication);

      await fillAndSubmitRegistrationForm(nickname);

      const errors = screen.queryAllByRole('error');
      const nicknameTooShortError = errors.find(
        (errorNode) => errorNode.getAttribute('data-error-code') === 'NICKNAME_TOO_SHORT',
      );
      expect(nicknameTooShortError).toBeInstanceOf(HTMLElement);
    },
  );

  it('hides error on registration form nickname input if nickname is exactly 8 characters long', async () => {
    await goToSignInPage();
    await clickOnGoogleSignInButton();
    authenticationServer.authenticate();
    app = await openApp(authentication);
    await fillAndSubmitRegistrationForm('nick');

    await fillAndSubmitRegistrationForm('nickname');

    const errors = screen.queryAllByRole('error');
    const nicknameTooShortError = errors.find(
      (errorNode) => errorNode.getAttribute('data-error-code') === 'NICKNAME_TOO_SHORT',
    );
    expect(nicknameTooShortError).toBeUndefined();
  });

  it('shows error on registration form nickname input if nickname is more than 20 characters long', async () => {
    await goToSignInPage();
    await clickOnGoogleSignInButton();
    authenticationServer.authenticate();
    app = await openApp(authentication);
    await fillAndSubmitRegistrationForm('nicknamenicknamenicknamenickname');

    const errors = screen.queryAllByRole('error');
    const nicknameTooLongError = errors.find(
      (errorNode) => errorNode.getAttribute('data-error-code') === 'NICKNAME_TOO_LONG',
    );
    expect(nicknameTooLongError).toBeInstanceOf(HTMLElement);
  });

  it('hides error on registration form nickname input if nickname is exactly 20 characters long', async () => {
    await goToSignInPage();
    await clickOnGoogleSignInButton();
    authenticationServer.authenticate();
    app = await openApp(authentication);
    await fillAndSubmitRegistrationForm('nicknamenicknamenicknamenickname');

    await fillAndSubmitRegistrationForm('nicknamenicknamenick');

    const errors = screen.queryAllByRole('error');
    const nicknameTooLongError = errors.find(
      (errorNode) => errorNode.getAttribute('data-error-code') === 'NICKNAME_TOO_LONG',
    );
    expect(nicknameTooLongError).toBeUndefined();
  });

  it.each([
    { nickname: 'n!ckname', reason: 'contains ! character' },
    { nickname: 'n,ckname', reason: 'contains , character' },
    { nickname: 'nickname123$', reason: 'contains $ character' },
  ])(
    'shows error on registration form nickname input if nickname contains forbidden characters ($reason)',
    async ({ nickname }) => {
      await goToSignInPage();
      await clickOnGoogleSignInButton();
      authenticationServer.authenticate();
      app = await openApp(authentication);
      await fillAndSubmitRegistrationForm(nickname);

      const errors = screen.queryAllByRole('error');
      const nicknameForbiddenCharactersError = errors.find(
        (errorNode) =>
          errorNode.getAttribute('data-error-code') === 'NICKNAME_FORBIDDEN_CHARACTERS',
      );
      expect(nicknameForbiddenCharactersError).toBeInstanceOf(HTMLElement);
    },
  );

  it('hides error on registration form nickname input if nickname does not contain forbidden character', async () => {
    await goToSignInPage();
    await clickOnGoogleSignInButton();
    authenticationServer.authenticate();
    app = await openApp(authentication);
    await fillAndSubmitRegistrationForm('n!ckname');

    await fillAndSubmitRegistrationForm('nickname123');

    const errors = screen.queryAllByRole('error');
    const nicknameForbiddenCharactersError = errors.find(
      (errorNode) => errorNode.getAttribute('data-error-code') === 'NICKNAME_FORBIDDEN_CHARACTERS',
    );
    expect(nicknameForbiddenCharactersError).toBeUndefined();
  });

  it('shows error on registration form nickname input if nickname contains less than 3 alphanumeric characters', async () => {
    await goToSignInPage();
    await clickOnGoogleSignInButton();
    authenticationServer.authenticate();
    app = await openApp(authentication);
    await fillAndSubmitRegistrationForm('-_-_-_-ab');

    const errors = screen.queryAllByRole('error');
    const nicknameTooFewAlphanumericError = errors.find(
      (errorNode) => errorNode.getAttribute('data-error-code') === 'NICKNAME_TOO_FEW_ALPHANUMERIC',
    );
    expect(nicknameTooFewAlphanumericError).toBeInstanceOf(HTMLElement);
  });

  it('hides error on registration form nickname input if nickname contains at least alphanumeric characters', async () => {
    await goToSignInPage();
    await clickOnGoogleSignInButton();
    authenticationServer.authenticate();
    app = await openApp(authentication);
    await fillAndSubmitRegistrationForm('_-_--_-_');

    await fillAndSubmitRegistrationForm('nickname123');

    const errors = screen.queryAllByRole('error');
    const nicknameTooFewAlphanumericError = errors.find(
      (errorNode) => errorNode.getAttribute('data-error-code') === 'NICKNAME_TOO_FEW_ALPHANUMERIC',
    );
    expect(nicknameTooFewAlphanumericError).toBeUndefined();
  });
});
