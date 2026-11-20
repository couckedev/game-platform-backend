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

async function fillAndSubmitRegistrationForm(nickname: string) {
  const registrationForm = screen.getByRole('form', { name: /Register on Game Platform/i });
  const nicknameInput = within(registrationForm).getByRole('textbox', { name: /Nickname/i });
  await userEvent.clear(nicknameInput);
  await userEvent.type(nicknameInput, nickname);
  const registrationFormSubmitButton = within(registrationForm).getByRole('button', {
    name: /Register an account/i,
  });
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
        authenticationServer.signIn();
        app = await openApp(authentication);
      },
      onSignOutStarted: async () => {
        app.unmount();
        authenticationServer.signOut();
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

  it('shows registration form if unregistered user has signed in', async () => {
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
  it('hides main navigation if unregistered user has signed in', async () => {
    await goToSignInPage();
    await clickOnGoogleSignInButton();

    expect(() => screen.getByRole('navigation', { name: 'Main navigation' })).toThrow();
  });

  it('shows registered player nickname on main navigation if valid registration form is submitted', async () => {
    await goToSignInPage();
    await clickOnGoogleSignInButton();

    await fillAndSubmitRegistrationForm('nickname123');

    const mainNavigation = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(within(mainNavigation).getByRole('link', { name: 'nickname123' })).toBeInstanceOf(
      HTMLElement,
    );
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
    await fillAndSubmitRegistrationForm('_-_--_-_');

    await fillAndSubmitRegistrationForm('nickname123');

    const errors = screen.queryAllByRole('error');
    const nicknameTooFewAlphanumericError = errors.find(
      (errorNode) => errorNode.getAttribute('data-error-code') === 'NICKNAME_TOO_FEW_ALPHANUMERIC',
    );
    expect(nicknameTooFewAlphanumericError).toBeUndefined();
  });

  it('show sign-in navigation link if user cancels registration', async () => {
    await goToSignInPage();
    await clickOnGoogleSignInButton();
    await fillAndSubmitRegistrationForm('nickname123');
    const cancelRegistrationButton = screen.getByTestId('registration-form-cancel-button');

    await userEvent.click(cancelRegistrationButton);

    expect(screen.getByTestId('main-navigation')).toBeInstanceOf(HTMLElement);
  });
});
