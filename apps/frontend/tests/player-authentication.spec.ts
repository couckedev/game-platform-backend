import userEvent from '@testing-library/user-event';
import { render, screen, within } from '@testing-library/vue';
import { createPinia } from 'pinia';
import { beforeAll, describe, it } from 'vitest';
import App from '../src/app/components/App.vue';
import router from '../src/app/router/index.ts';

describe('Player authentication', () => {
  beforeAll(() => {
    render(App, {
      global: {
        plugins: [createPinia(), router],
        provide: {},
      },
    });
  });
  it('shows login page whensign-in navigation link is clicked', async () => {
    const mainNavigation = screen.getByRole('navigation', { name: 'Main navigation' });
    const signInNavigationLink = within(mainNavigation).getByRole('link', { name: 'Sign in' });

    await userEvent.click(signInNavigationLink);

    expect(window.location.pathname).toBe('/sign-in');
  });
});
