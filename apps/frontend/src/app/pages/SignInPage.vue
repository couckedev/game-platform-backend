<script setup lang="ts">
import {
  usePlayerStore,
  PlayerRegistrationForm,
  SignInButton,
} from '@/player/infrastructure/vuejs';

const playerStore = usePlayerStore();
</script>

<template>
  <PlayerRegistrationForm v-if="playerStore.hasSignedIn" />
  <SignInButton v-if="!playerStore.hasSignedIn" provider="google" />
</template>

<style scoped></style>
