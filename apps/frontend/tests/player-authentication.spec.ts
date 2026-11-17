import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/vue';
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
    const signInNavigationLink = screen.getByTestId('signin-navigation-link');
    userEvent.click(signInNavigationLink);

    await expect(screen.findByTestId('sign-in-page')).resolves.toBeInstanceOf(HTMLElement);
  });
});
