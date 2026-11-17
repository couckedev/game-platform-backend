import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/vue';
import { beforeEach, describe, it } from 'vitest';
import { createMemoryHistory } from 'vue-router';
import { bootstrapApp } from '@/app/bootstrap';
import App from '@/app/components/App.vue';
import { createAppRouter } from '@/app/router';
import type { Player } from '@/player/domain';
import {
  InMemoryIdentityProvider,
  InMemoryIdentityProviderServer,
} from '@/player/infrastructure/authentication/in-memory';
import { createPlayerModule } from '@/player/infrastructure/composition';
import { InMemoryPlayerRepository } from '@/player/infrastructure/persistence/in-memory';

const identityProviderServer = new InMemoryIdentityProviderServer();
const registeredPlayers = new Map<string, Player>();

describe('Player authentication', () => {
  let app: ReturnType<typeof render>;

  async function openApp(identityProviderServer: InMemoryIdentityProviderServer) {
    const identityProvider = new InMemoryIdentityProvider(identityProviderServer);
    const playerRepository = new InMemoryPlayerRepository(registeredPlayers, identityProvider);
    const router = createAppRouter(createMemoryHistory());
    identityProvider.restore();
    const boostrap = bootstrapApp({
      router,
      identityProvider,
      playerModule: createPlayerModule({ identityProvider, playerRepository }),
    });
    app = render(App, {
      global: {
        plugins: [boostrap],
      },
    });

    await router.push('/');
    await router.isReady();

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
    await registerPlayerWithNickname('player-1');
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

  it.each([
    { nicknameValue: 'n' },
    { nicknameValue: 'ni' },
    { nicknameValue: 'nic' },
    { nicknameValue: 'nick' },
    { nicknameValue: 'nickn' },
    { nicknameValue: 'nickna' },
    { nicknameValue: 'nicknam' },
  ])('shows error if user registers with too short nickname', async ({ nicknameValue }) => {
    identityProviderServer.setIdentity('user');
    await signInUser();

    await registerPlayerWithNickname(nicknameValue);

    const errors = getRegistrationFormErrors();
    expect(errors).toContainEqual('NICKNAME_TOO_SHORT');
  });

  it('shows error if user registers with too long nickname', async () => {
    identityProviderServer.setIdentity('user');
    await signInUser();

    await registerPlayerWithNickname('nicknamenicknamenicknamenickname');

    const errors = getRegistrationFormErrors();
    expect(errors).toContainEqual('NICKNAME_TOO_LONG');
  });

  it('shows two errors if user registers with too short nickname containing characters other than letters, numbers, hyphens, or underscores', async () => {
    identityProviderServer.setIdentity('user');
    await signInUser();

    await registerPlayerWithNickname('n!ck');

    const errors = getRegistrationFormErrors();
    expect(errors).toContainEqual('NICKNAME_TOO_SHORT');
    expect(errors).toContainEqual('NICKNAME_CONTAINS_FORBIDDEN_CHARACTERS');
  });

  it.each([{ nicknameValue: 'n!ckn4m€' }, { nicknameValue: '123nick name123' }])(
    'shows error if user registers  with nickname containing characters other than letters, numbers, hyphens, or underscores',
    async ({ nicknameValue }) => {
      identityProviderServer.setIdentity('user');
      await signInUser();

      await registerPlayerWithNickname(nicknameValue);

      const errors = getRegistrationFormErrors();

      expect(errors).toContainEqual('NICKNAME_CONTAINS_FORBIDDEN_CHARACTERS');
    },
  );

  it.each([
    { nicknameValue: '-_--_--_' },
    { nicknameValue: '123456789' },
    { nicknameValue: '-_-1234-_-_--' },
  ])(
    'shows error if user registers with nickname containing too few letters',
    async ({ nicknameValue }) => {
      identityProviderServer.setIdentity('user');
      await signInUser();

      await registerPlayerWithNickname(nicknameValue);

      const errors = getRegistrationFormErrors();
      expect(errors).toContainEqual('NICKNAME_TOO_FEW_LETTERS');
    },
  );

  it('show error if user registers with nickname already taken', async () => {
    const nickname = 'nickname123';
    identityProviderServer.setIdentity('user1');
    await signInUser();
    await registerPlayerWithNickname(nickname);
    await signOutUser();
    identityProviderServer.setIdentity('user2');
    await signInUser();
    await registerPlayerWithNickname(nickname);

    const errors = getRegistrationFormErrors();
    expect(errors).toContainEqual('NICKNAME_ALREADY_TAKEN');
  });
});

function getRegistrationFormErrors(): string[] {
  const registrationErrorElements = screen.getAllByTestId('registration-form-nickname-error');
  return registrationErrorElements.map(
    (registrationErrorElement) =>
      registrationErrorElement.getAttribute('data-error-code') as string,
  );
}
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
