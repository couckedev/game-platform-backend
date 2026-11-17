import { defineStore } from 'pinia';
import { inject, ref } from 'vue';
import type { IdentityProvider } from '@/app/authentication/common';
import { IdentityProviderToken } from '../tokens';

export const usePlayerStore = defineStore('player', () => {
  const identityProvider = inject<IdentityProvider>(IdentityProviderToken);
  if (identityProvider === undefined) {
    throw new Error('Identity provider must be provided before using it');
  }

  const hasSignedIn = ref(false);

  const signInWithGoogle = () => {
    identityProvider.signInWith();
    return;
  };

  const restoreIdentity = () => {
    identityProvider.restore();
    hasSignedIn.value = identityProvider.identity !== null;
  };

  return { signInWithGoogle, restoreIdentity, hasSignedIn };
});
