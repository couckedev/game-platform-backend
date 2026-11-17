<script setup lang="ts">
import {
  usePlayerStore,
  PlayerRegistrationForm,
  SignInButton,
} from '@/player/infrastructure/vuejs';

const playerStore = usePlayerStore();
</script>

<template>
  <div data-testid="sign-in-page">
    <PlayerRegistrationForm v-if="playerStore.hasSignedIn" />
    <SignInButton provider="google" />
  </div>
</template>

<style scoped></style>
