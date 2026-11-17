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

    await expect(screen.findByTestId('sign-in-page')).resolves.toBeInstanceOf(HTMLElement);
  });
  it('hides google sign in button when user has signed in', async () => {
    const signInNavigationLink = screen.getByTestId('sign-in-navigation-link');
    await userEvent.click(signInNavigationLink);
    const signInWithGoogleButton = screen.getByTestId('sign-in-with-google-button');

    await userEvent.click(signInWithGoogleButton);

    await expect(screen.findByTestId('sign-in-with-google-button')).rejects.toThrow();
  });
});
