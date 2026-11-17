import { defineStore } from 'pinia';
import { inject, ref } from 'vue';

interface AuthenticatedPlayer {
  nickname: string;
}

interface IdentityProvider {
  signIn(provider: string): void;
  signOut(): void;
}

interface Player {
  nickname: string;
}
interface PlayerRepository {
  register(player: Player): void;
  getCurrentPlayer(): Player | null;
}
export const usePlayerStore = defineStore('player', () => {
  const identityProvider = inject<IdentityProvider>('IdentityProvider');
  if (identityProvider === undefined) {
    throw new Error('Identity provider must been set before using it');
  }

  const playerRepository = inject<PlayerRepository>('PlayerRepository');
  if (playerRepository === undefined) {
    throw new Error('Player repository must been set before using it');
  }

  const hasSignedIn = ref(false);
  const authenticatedPlayer = ref<AuthenticatedPlayer | null>(null);

  const signIn = (provider: string) => {
    identityProvider.signIn(provider);
    hasSignedIn.value = true;
    const currentPlayer = playerRepository.getCurrentPlayer();
    if (currentPlayer !== null) {
      authenticatedPlayer.value = {
        nickname: currentPlayer.nickname,
      };
    }
  };

  const signOut = () => {
    identityProvider.signOut();
    hasSignedIn.value = false;
    authenticatedPlayer.value = null;
  };

  const register = (nickname: string) => {
    const player: Player = {
      nickname,
    };
    playerRepository.register(player);
    authenticatedPlayer.value = { nickname };
  };

  return { signIn, signOut, register, hasSignedIn, authenticatedPlayer };
});
