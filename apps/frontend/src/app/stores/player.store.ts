import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePlayerStore = defineStore('player', () => {
  const hasSignedIn = ref(false);

  const signIn = () => {
    hasSignedIn.value = true;
  };

  return { signIn, hasSignedIn };
});
