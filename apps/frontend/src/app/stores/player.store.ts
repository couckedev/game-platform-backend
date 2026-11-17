import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePlayerStore = defineStore('player', () => {
  const hasSignedIn = ref(false);
  const isRegistered = ref(false);

  const signIn = () => {
    hasSignedIn.value = true;
  };

  const signOut = () => {
    hasSignedIn.value = false;
  };

  return { signIn, signOut, hasSignedIn, isRegistered };
});
