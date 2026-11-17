<script setup lang="ts">
import { RegistrationForm } from '@/player/infrastructure/vuejs/features/register-player';
import { usePlayerStore } from '@/player/infrastructure/vuejs/stores';

const playerStore = usePlayerStore();

const handlePlayerRegistrationFormSubmit = (event: SubmitEvent) => {
  const formData = new FormData(event.target as HTMLFormElement);
  playerStore.register(formData.get('nickname') as string);
};

const handleSignInWithGoogleButtonClick = () => playerStore.signIn('google');
</script>

<template>
  <div data-testid="sign-in-page">
    <button
      v-if="playerStore.playerAuthentication.status === 'SIGNED_OUT'"
      type="button"
      data-testid="sign-in-with-google-button"
      @click="handleSignInWithGoogleButtonClick"
    >
      Sign in with Google
    </button>

    <RegistrationForm
      data-testid="player-registration-form"
      v-if="playerStore.playerAuthentication.status === 'NOT_REGISTERED'"
    />
  </div>
</template>

<style scoped></style>
