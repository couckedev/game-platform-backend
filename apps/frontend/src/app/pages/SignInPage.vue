<script setup lang="ts">
import { usePlayerStore } from '@/app/stores/player.store';

const playerStore = usePlayerStore();
</script>

<template>
  <div data-testid="sign-in-page">
    <button
      v-if="!playerStore.hasSignedIn"
      type="button"
      data-testid="sign-in-with-google-button"
      @click="playerStore.signInWithGoogle"
    >
      Sign in with Google
    </button>

    <div data-testid="player-registration-form" v-if="playerStore.hasSignedIn"></div>
  </div>
</template>

<style scoped></style>
