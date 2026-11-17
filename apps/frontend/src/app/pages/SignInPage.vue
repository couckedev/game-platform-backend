<script setup lang="ts">
import { usePlayerStore } from '../stores/player.store';

const playerStore = usePlayerStore();
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
  </div>
</template>

<style scoped></style>
