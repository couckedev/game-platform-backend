import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/vue';
import { createPinia } from 'pinia';
import { beforeEach, describe, it } from 'vitest';
import { createMemoryHistory } from 'vue-router';
import App from '../src/app/components/App.vue';
import { createAppRouter } from '../src/app/router/index.ts';

interface AuthenticatedUserIdentity {
  externalAccountId: string;
}
interface IdentityProvider {
  signIn(provider: string): void;
  signOut(): void;
  identity: AuthenticatedUserIdentity | null;
}

class InMemoryIdentityProviderServer {
  private _identity: string | null = null;

  setIdentity(identity: string) {
    this._identity = identity;
  }

  requireIdentity(): string {
    if (this._identity === null) {
      throw new Error('Identity must be set on in memory identity provider server before using it');
    }
    return this._identity;
  }
}

class InMemoryIdentityProvider implements IdentityProvider {
  _authenticatedUserIdentity: AuthenticatedUserIdentity | null = null;

  constructor(private readonly identityProviderServer: InMemoryIdentityProviderServer) {}

  signIn(provider: 'google') {
    this._authenticatedUserIdentity = {
      externalAccountId: `${provider}-${this.identityProviderServer.requireIdentity()}`,
    };
  }

  signOut(): void {
    this._authenticatedUserIdentity = null;
  }

  get identity() {
    return this._authenticatedUserIdentity;
  }
}

interface Player {
  nickname: string;
}

interface PlayerRepository {
  register(player: Player): void;
  getCurrentPlayer(): Player | null;
}
class InMemoryPlayerRepository implements PlayerRepository {
  private readonly _registeredPlayers = new Map<string, Player>();

  constructor(private readonly identityProvider: IdentityProvider) {}

  register(player: Player): void {
    const identity = this.identityProvider.identity;
    if (identity === null) {
      throw new Error('Cannot register nickname, user is not signed in');
    }
    this._registeredPlayers.set(identity.externalAccountId, player);
  }

  getCurrentPlayer() {
    const identity = this.identityProvider.identity;
    if (identity === null) {
      throw new Error('Cannot register nickname, user is not signed in');
    }
    return this._registeredPlayers.get(identity.externalAccountId) ?? null;
  }
}

describe('Player authentication', () => {
  const identityProviderServer = new InMemoryIdentityProviderServer();
  beforeEach(async () => {
    const history = createMemoryHistory();
    const router = createAppRouter(history);
    await router.push('/');
    const identityProvider = new InMemoryIdentityProvider(identityProviderServer);
    const playerRepository = new InMemoryPlayerRepository(identityProvider);
    render(App, {
      global: {
        plugins: [createPinia(), router],
        provide: {
          IdentityProvider: identityProvider,
          PlayerRepository: playerRepository,
        },
      },
    });
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

    expect(screen.getByTestId('authenticated-player-nickname-navigation-label')).toBeInstanceOf(
      HTMLElement,
    );
    expect(
      screen.getByTestId('authenticated-player-nickname-navigation-label').textContent,
    ).toStrictEqual('nickname');
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

    expect(screen.getByTestId('authenticated-player-nickname-navigation-label')).toBeInstanceOf(
      HTMLElement,
    );
    expect(
      screen.getByTestId('authenticated-player-nickname-navigation-label').textContent,
    ).toStrictEqual('nickname');
  });
});

async function registerPlayerWithNickname(nickname: string) {
  const registrationFormNicknameInput = screen.getByTestId(
    'player-registration-form-nickname-input',
  );
  const registrationFormSubmitButton = screen.getByTestId('player-registration-form-submit-button');
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
