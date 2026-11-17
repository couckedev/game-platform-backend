<script setup lang="ts">
import { usePlayerStore } from '../stores/player.store';

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

    <form
      data-testid="player-registration-form"
      v-if="playerStore.playerAuthentication.status === 'NOT_REGISTERED'"
      @submit="handlePlayerRegistrationFormSubmit"
    >
      <input type="text" data-testid="player-registration-form-nickname-input" name="nickname" />
      <span data-testid="player-registration-form-nickname-too-short-error"
        >Nickname is too short</span
      >
      <button type="submit" data-testid="player-registration-form-submit-button">Register</button>
    </form>
  </div>
</template>

<style scoped></style>
