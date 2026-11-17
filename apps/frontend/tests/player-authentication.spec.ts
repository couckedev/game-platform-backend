import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/vue';
import { createPinia } from 'pinia';
import { beforeEach, describe, it } from 'vitest';
import { createMemoryHistory } from 'vue-router';
import App from '../src/app/components/App.vue';
import { createAppRouter } from '../src/app/router/index.ts';

describe('Player authentication', () => {
  beforeEach(async () => {
    const history = createMemoryHistory();
    const router = createAppRouter(history);
    await router.push('/');
    render(App, {
      global: {
        plugins: [createPinia(), router],
        provide: {},
      },
    });
  });

  it('shows login page when sign-in navigation link is clicked', async () => {
    const signInNavigationLink = screen.getByTestId('sign-in-navigation-link');
    await userEvent.click(signInNavigationLink);

    expect(screen.getByTestId('sign-in-page')).toBeInstanceOf(HTMLElement);
  });

  it('hides google sign in button when user has signed in', async () => {
    const signInNavigationLink = screen.getByTestId('sign-in-navigation-link');
    await userEvent.click(signInNavigationLink);
    const signInWithGoogleButton = screen.getByTestId('sign-in-with-google-button');

    await userEvent.click(signInWithGoogleButton);

    expect(() => screen.getByTestId('sign-in-with-google-button')).toThrow();
  });

  it('hides sign-in navigation link when user has signed in', async () => {
    const signInNavigationLink = screen.getByTestId('sign-in-navigation-link');
    await userEvent.click(signInNavigationLink);
    const signInWithGoogleButton = screen.getByTestId('sign-in-with-google-button');

    await userEvent.click(signInWithGoogleButton);

    expect(() => screen.getByTestId('sign-in-navigation-link')).toThrow();
  });

  it('shows sign-out navigation link when user has signed in', async () => {
    const signInNavigationLink = screen.getByTestId('sign-in-navigation-link');
    await userEvent.click(signInNavigationLink);
    const signInWithGoogleButton = screen.getByTestId('sign-in-with-google-button');

    await userEvent.click(signInWithGoogleButton);

    expect(screen.getByTestId('sign-out-navigation-button')).toBeInstanceOf(HTMLElement);
  });

  it('hides sign-out navigation link when user has signed out', async () => {
    const signInNavigationLink = screen.getByTestId('sign-in-navigation-link');
    await userEvent.click(signInNavigationLink);
    const signInWithGoogleButton = screen.getByTestId('sign-in-with-google-button');
    await userEvent.click(signInWithGoogleButton);
    const signOutNavigationButton = screen.getByTestId('sign-out-navigation-button');

    await userEvent.click(signOutNavigationButton);

    expect(() => screen.getByTestId('sign-out-navigation-button')).toThrow();
  });

  it('shows registration form if unregistered user has signed in', async () => {
    const signInNavigationLink = screen.getByTestId('sign-in-navigation-link');
    await userEvent.click(signInNavigationLink);
    const signInWithGoogleButton = screen.getByTestId('sign-in-with-google-button');

    await userEvent.click(signInWithGoogleButton);

    expect(screen.getByTestId('player-registration-form')).toBeInstanceOf(HTMLElement);
  });
});
