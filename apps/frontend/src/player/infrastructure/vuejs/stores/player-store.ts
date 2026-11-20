import { defineStore } from 'pinia';
import { computed, inject, ref } from 'vue';
import type { Authentication } from '@/player/infrastructure/authentication/common';
import {
  AuthenticationToken,
  type PlayerModule,
  PlayerModuleToken,
} from '@/player/infrastructure/vuejs';
import type { PlayerRegistrationViewModel } from '@/player/interface-adapters/features/register-player';

interface AuthenticatedPlayer {
  nickname: string;
}

export const usePlayerStore = defineStore('player', () => {
  const authentication = inject<Authentication>(AuthenticationToken);
  if (authentication === undefined) {
    throw new Error('Session provider must be provided before using it');
  }

  const playerModule = inject<PlayerModule>(PlayerModuleToken);
  if (playerModule === undefined) {
    throw new Error('Player module must be provided before using it');
  }

  const registrationFormErrors = ref<PlayerRegistrationViewModel['errors']>({
    nickname: [],
  });

  const hasSignedIn = ref(false);
  const isRegistering = computed(() => {
    return hasSignedIn.value === true && authenticatedPlayer.value === null;
  });
  const authenticatedPlayer = ref<AuthenticatedPlayer | null>(null);

  const signInWith = async () => {
    await authentication.startSignInProcess();
    return;
  };

  const restoreIdentity = async () => {
    await authentication.restore();
    hasSignedIn.value = authentication.isAuthenticated;
  };

  const register = (nickname: string) => {
    registrationFormErrors.value = { nickname: [] };
    const viewModel = playerModule.registerPlayer({
      nickname,
    });
    if (viewModel.player) {
      hasSignedIn.value = true;
      authenticatedPlayer.value = { nickname: viewModel.player.nickname };
    }
    registrationFormErrors.value = viewModel.errors;
    return;
  };

  const cancelRegistration = async () => {
    await authentication.startSignOutProcess();
    return;
  };

  return {
    signInWith,
    restoreIdentity,
    register,
    cancelRegistration,
    hasSignedIn,
    isRegistering,
    authenticatedPlayer,
    registrationFormErrors,
  };
});
