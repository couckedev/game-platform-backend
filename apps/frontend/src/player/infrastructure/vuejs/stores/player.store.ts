import { defineStore } from 'pinia';
import { ref } from 'vue';
import { IdentityProviderToken, PlayerModuleToken } from '@/player/infrastructure/vuejs/tokens';
import { injectStrict } from '@/shared';

type PlayerAuthentication =
  | { status: 'SIGNED_OUT' }
  | {
      status: 'NOT_REGISTERED';
    }
  | { status: 'AUTHENTICATED'; player: { nickname: string } };

interface RegistrationFormErrors {
  nickname: string[];
}

export const usePlayerStore = defineStore('player', () => {
  const identityProvider = injectStrict(IdentityProviderToken);
  const playerModule = injectStrict(PlayerModuleToken);

  const playerAuthentication = ref<PlayerAuthentication>({ status: 'SIGNED_OUT' });
  const registrationFormErrors = ref<RegistrationFormErrors>({
    nickname: [],
  });

  const signIn = async (provider: string) => {
    identityProvider.signIn(provider);
    await authenticatePlayer();
  };

  const restoreIdentity = async () => {
    identityProvider.restore();
    if (identityProvider.identity === null) {
      return;
    }
    await authenticatePlayer();
  };

  const authenticatePlayer = async () => {
    const viewModel = await playerModule.authenticatePlayer();
    if (viewModel.status === 'FOUND') {
      playerAuthentication.value = {
        status: 'AUTHENTICATED',
        player: viewModel.authenticatedPlayer,
      };
      return;
    }
    playerAuthentication.value = {
      status: 'NOT_REGISTERED',
    };
    return;
  };

  const signOut = () => {
    identityProvider.signOut();
    playerAuthentication.value = { status: 'SIGNED_OUT' };
  };

  const register = async (nickname: string) => {
    const request = { nickname };
    const viewModel = await playerModule.registerPlayer(request);
    if (viewModel.status === 'SUCCESS') {
      playerAuthentication.value = {
        status: 'AUTHENTICATED',
        player: viewModel.registeredPlayer,
      };
      return;
    }
    registrationFormErrors.value = viewModel.rejectionReasons;
  };

  return {
    signIn,
    signOut,
    register,
    restoreIdentity,
    playerAuthentication,
    registrationFormErrors,
  };
});
