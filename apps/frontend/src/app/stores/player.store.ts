import { defineStore } from 'pinia';
import { ref } from 'vue';

interface AuthenticatedPlayer {
  nickname: string;
}

export const usePlayerStore = defineStore('player', () => {
  const hasSignedIn = ref(false);
  const currentPlayer = ref<AuthenticatedPlayer | null>(null);

  const signIn = () => {
    hasSignedIn.value = true;
  };

  const signOut = () => {
    hasSignedIn.value = false;
  };

  const register = (nickname: string) => {
    currentPlayer.value = { nickname };
  };

  return { signIn, signOut, register, hasSignedIn, currentPlayer };
});
