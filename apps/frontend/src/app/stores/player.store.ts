import { defineStore } from 'pinia';
import { ref } from 'vue';

interface AuthenticatedPlayer {
  nickname: string;
}

export const usePlayerStore = defineStore('player', () => {
  const hasSignedIn = ref(false);
  const authenticatedPlayer = ref<AuthenticatedPlayer | null>(null);

  const signIn = () => {
    hasSignedIn.value = true;
  };

  const signOut = () => {
    hasSignedIn.value = false;
    authenticatedPlayer.value = null;
  };

  const register = (nickname: string) => {
    authenticatedPlayer.value = { nickname };
  };

  return { signIn, signOut, register, hasSignedIn, authenticatedPlayer };
});
