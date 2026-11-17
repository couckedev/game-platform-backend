import { defineStore } from 'pinia';
import { inject, ref } from 'vue';
import type { Authentication, Provider } from '@/player/infrastructure/authentication/common';
import { AuthenticationToken } from '../tokens';

interface AuthenticatedPlayer {
  nickname: string;
}

export const usePlayerStore = defineStore('player', () => {
  const authentication = inject<Authentication>(AuthenticationToken);
  if (authentication === undefined) {
    throw new Error('Session provider must be provided before using it');
  }

  const hasSignedIn = ref(false);
  const authenticatedPlayer = ref<AuthenticatedPlayer | null>(null);

  const signInWith = async (provider: Provider) => {
    await authentication.startSignInProcess();
    return;
  };

  const restoreIdentity = async () => {
    await authentication.restore();
    hasSignedIn.value = authentication.isAuthenticated;
  };

  const register = (nickname: string) => {
    hasSignedIn.value = true;
    authenticatedPlayer.value = { nickname };
  };

  return { signInWith, restoreIdentity, register, hasSignedIn, authenticatedPlayer };
});
