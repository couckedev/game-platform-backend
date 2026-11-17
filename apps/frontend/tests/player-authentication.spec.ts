import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/vue';
import { beforeEach, describe, it } from 'vitest';
import { createMemoryHistory } from 'vue-router';
import type { Player } from '@/player/domain';
import {
  InMemoryIdentityProvider,
  InMemoryIdentityProviderServer,
} from '@/player/infrastructure/authentication/in-memory';
import { createPlayerModule } from '@/player/infrastructure/composition/index.ts';
import { InMemoryPlayerRepository } from '@/player/infrastructure/persistence/in-memory';
import { bootstrapApp } from '../src/app/bootstrap';
import App from '../src/app/components/App.vue';

const identityProviderServer = new InMemoryIdentityProviderServer();
const registeredPlayers = new Map<string, Player>();

describe('Player authentication', () => {
  let app: ReturnType<typeof render>;

  async function openApp(identityProviderServer: InMemoryIdentityProviderServer) {
    const identityProvider = new InMemoryIdentityProvider(identityProviderServer);
    const playerRepository = new InMemoryPlayerRepository(registeredPlayers, identityProvider);
    identityProvider.restore();
    const boostrap = bootstrapApp({
      history: createMemoryHistory(),
      identityProvider,
      playerModule: createPlayerModule({ identityProvider, playerRepository }),
    });
    app = render(App, {
      global: {
        plugins: [boostrap],
      },
    });

    await boostrap.router.push('/');
    await boostrap.router.isReady();

    return app;
  }

  beforeEach(async () => {
    app = await openApp(identityProviderServer);
  });

  afterEach(() => {
    identityProviderServer.signOut();
    registeredPlayers.clear();
  });

  it('shows login page when sign-in navigation link is clicked', async () => {
    const signInNavigationLink = screen.getByTestId('sign-in-navigation-link');
    await userEvent.click(signInNavigationLink);

    expect(screen.getByTestId('sign-in-page')).toBeInstanceOf(HTMLElement);
  });

  it('hides google sign in button when user has signed in', async () => {
    identityProviderServer.setIdentity('user');
    await signInUser();

    expect(() => screen.getByTestId('sign-in-with-google-button')).toThrow();
  });

  it('hides sign-in navigation link when user has signed in', async () => {
    identityProviderServer.setIdentity('user');
    await signInUser();

    expect(() => screen.getByTestId('sign-in-navigation-link')).toThrow();
  });

  it('shows sign-out navigation link when user has signed in', async () => {
    identityProviderServer.setIdentity('user');
    await signInUser();

    expect(screen.getByTestId('sign-out-navigation-button')).toBeInstanceOf(HTMLElement);
  });

  it('hides sign-out navigation link when user has signed out', async () => {
    identityProviderServer.setIdentity('user');
    await signInUser();

    await signOutUser();

    expect(() => screen.getByTestId('sign-out-navigation-button')).toThrow();
  });

  it('shows registration form if unregistered user has signed in', async () => {
    identityProviderServer.setIdentity('user');
    await signInUser();

    expect(screen.getByTestId('player-registration-form')).toBeInstanceOf(HTMLElement);
  });

  it('shows authenticated player nickname on main navigation when registration form hass been submitted', async () => {
    identityProviderServer.setIdentity('user');
    await signInUser();
    await registerPlayerWithNickname('nickname');

    const authenticatedPlayerNicknameNavigationlabel = screen.getByTestId(
      'authenticated-player-nickname-navigation-label',
    );
    expect(authenticatedPlayerNicknameNavigationlabel).toBeInstanceOf(HTMLElement);
    expect(authenticatedPlayerNicknameNavigationlabel.textContent).toStrictEqual('nickname');
  });

  it('shows registration form if user 1 signs in, registered, signs out and user 2 signs in', async () => {
    identityProviderServer.setIdentity('user1');
    await signInUser();
    await registerPlayerWithNickname('player1');
    await signOutUser();

    identityProviderServer.setIdentity('user2');
    await signInUser();

    expect(screen.getByTestId('player-registration-form')).toBeInstanceOf(HTMLElement);
  });

  it('shows authenticated player 1 nickname on main navigation if registered user 1 signs in', async () => {
    identityProviderServer.setIdentity('user');
    await signInUser();
    await registerPlayerWithNickname('nickname');
    await signOutUser();

    await signInUser();

    const authenticatedPlayerNicknameNavigationlabel = screen.getByTestId(
      'authenticated-player-nickname-navigation-label',
    );
    expect(authenticatedPlayerNicknameNavigationlabel).toBeInstanceOf(HTMLElement);
    expect(authenticatedPlayerNicknameNavigationlabel.textContent).toStrictEqual('nickname');
  });

  it('shows authenticated player nickname if signed in user refreshes the page', async () => {
    identityProviderServer.setIdentity('user');
    await signInUser();
    await registerPlayerWithNickname('nickname');
    await signOutUser();
    await signInUser();

    app.unmount();
    await openApp(identityProviderServer);

    const authenticatedPlayerNicknameNavigationlabel = screen.getByTestId(
      'authenticated-player-nickname-navigation-label',
    );
    expect(authenticatedPlayerNicknameNavigationlabel).toBeInstanceOf(HTMLElement);
    expect(authenticatedPlayerNicknameNavigationlabel.textContent).toStrictEqual('nickname');
  });

  it('shows error if user registers with nickname too short ', async () => {
    identityProviderServer.setIdentity('user');
    await signInUser();
    await registerPlayerWithNickname('nick');

    const playerRegistrationFormNicknameTooShortError = screen.getByTestId(
      'player-registration-form-nickname-too-short-error',
    );
    expect(playerRegistrationFormNicknameTooShortError).toBeInstanceOf(HTMLElement);
  });
});

async function registerPlayerWithNickname(nickname: string) {
  const registrationFormNicknameInput = screen.getByTestId(
    'player-registration-form-nickname-input',
  );
  const registrationFormSubmitButton = screen.getByTestId('player-registration-form-submit-button');
  await userEvent.clear(registrationFormNicknameInput);
  await userEvent.type(registrationFormNicknameInput, nickname);
  await userEvent.click(registrationFormSubmitButton);
}

async function signInUser() {
  const signInNavigationLink = screen.getByTestId('sign-in-navigation-link');
  await userEvent.click(signInNavigationLink);
  const signInWithGoogleButton = screen.getByTestId('sign-in-with-google-button');
  await userEvent.click(signInWithGoogleButton);
}

async function signOutUser() {
  const signOutNavigationButton = screen.getByTestId('sign-out-navigation-button');

  await userEvent.click(signOutNavigationButton);
}
