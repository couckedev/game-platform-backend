import userEvent from '@testing-library/user-event';
import { type RenderResult, render, screen } from '@testing-library/vue';
import { beforeEach, describe, it } from 'vitest';
import { createMemoryHistory } from 'vue-router';
import {
  InMemoryIdentityProvider,
  InMemoryIdentityProviderServer,
} from '@/app/authentication/in-memory';
import { bootstrapApp } from '@/app/bootstrap/bootstrap-app.plugin';
import App from '@/app/components/App.vue';
import { createAppRouter } from '@/app/router/index.ts';

async function openApp(identityProviderServer: InMemoryIdentityProviderServer) {
  const identityProvider = new InMemoryIdentityProvider(identityProviderServer);
  const router = createAppRouter(createMemoryHistory());
  const boostrap = bootstrapApp({
    router,
    identityProvider,
  });
  await router.push('/');
  await router.isReady();
  return render(App, {
    global: {
      plugins: [boostrap],
    },
  });
}

async function goToSignInPage() {
  const signInNavigationLink = screen.getByTestId('sign-in-navigation-link');
  await userEvent.click(signInNavigationLink);
}

async function clickOnGoogleSignInButton() {
  const signInWithGoogleButton = screen.getByTestId('sign-in-with-google-button');
  await userEvent.click(signInWithGoogleButton);
}

describe('Player authentication', () => {
  let app: RenderResult;
  const identityProviderServer = new InMemoryIdentityProviderServer();

  beforeEach(async () => {
    app = await openApp(identityProviderServer);
  });

  it('shows login page when sign-in navigation link is clicked', async () => {
    await goToSignInPage();

    await expect(screen.findByTestId('sign-in-page')).resolves.toBeInstanceOf(HTMLElement);
  });

  it('shows registration form if unregistered user has signed in with google', async () => {
    await goToSignInPage();

    await clickOnGoogleSignInButton();
    app.unmount();
    identityProviderServer.setIdentity('google-user-provider-user-id');
    app = await openApp(identityProviderServer);
    await goToSignInPage();

    expect(screen.getByTestId('player-registration-form')).toBeInstanceOf(HTMLElement);
  });
});
