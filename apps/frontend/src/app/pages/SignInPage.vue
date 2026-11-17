<script setup lang="ts">
import { usePlayerStore } from '../stores/player.store';

const playerStore = usePlayerStore();

const handlePlayerRegistrationFormSubmit = (event: SubmitEvent) => {
  const formData = new FormData(event.target as HTMLFormElement);
  playerStore.register(formData.get('nickname') as string);
};
</script>

<template>
  <div data-testid="sign-in-page">
    <button
      v-if="!playerStore.hasSignedIn"
      type="button"
      data-testid="sign-in-with-google-button"
      @click="playerStore.signIn"
    >
      Sign in with Google
    </button>

    <form
      data-testid="player-registration-form"
      v-if="playerStore.hasSignedIn && playerStore.currentPlayer === null"
      @submit="handlePlayerRegistrationFormSubmit"
    >
      <input type="text" data-testid="player-registration-form-nickname-input" name="nickname" />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<style scoped></style>
