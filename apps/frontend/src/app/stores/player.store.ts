import { defineStore } from 'pinia';
import { inject, ref } from 'vue';
import type { IdentityProvider } from '@/player/infrastructure/authentication/common';
import type { PlayerModule } from '@/player/infrastructure/composition';
import { IdentityProviderToken, PlayerModuleToken } from '../tokens';

type PlayerAuthentication =
  | { status: 'SIGNED_OUT' }
  | {
      status: 'NOT_REGISTERED';
    }
  | { status: 'AUTHENTICATED'; player: { nickname: string } };

type NicknameRejectionReason = 'NICKNAME_TOO_SHORT';

export const usePlayerStore = defineStore('player', () => {
  const identityProvider = inject<IdentityProvider>(IdentityProviderToken);
  if (identityProvider === undefined) {
    throw new Error('Identity provider must been set before using it');
  }

  const playerModule = inject<PlayerModule>(PlayerModuleToken);
  if (playerModule === undefined) {
    throw new Error('Player module must been set before using it');
  }

  const playerAuthentication = ref<PlayerAuthentication>({ status: 'SIGNED_OUT' });
  const registrationErrors = ref<NicknameRejectionReason[]>([]);

  const signIn = (provider: string) => {
    identityProvider.signIn(provider);
    authenticatePlayer();
  };

  const restoreIdentity = () => {
    identityProvider.restore();
    if (identityProvider.identity === null) {
      return;
    }
    authenticatePlayer();
  };

  const authenticatePlayer = () => {
    const viewModel = playerModule.authenticatePlayer();
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

  const register = (nickname: string) => {
    const request = { nickname };
    const viewModel = playerModule.registerPlayer(request);
    if (viewModel.status === 'SUCCESS') {
      playerAuthentication.value = {
        status: 'AUTHENTICATED',
        player: viewModel.registeredPlayer,
      };
      return;
    }
    registrationErrors.value.push(viewModel.rejectionReason);
  };

  return { signIn, signOut, register, restoreIdentity, playerAuthentication };
});
