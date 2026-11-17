<script setup lang="ts">
import { usePlayerStore } from '@/player/infrastructure/vuejs';

const playerStore = usePlayerStore();
</script>

<template>
  <router-link :to="{ name: 'sign-in' }" data-testid="sign-in-navigation-link">Sign in</router-link>
  <span
    data-testid="main-navigation-authenticated-player-nickname"
    v-if="playerStore.hasSignedIn && playerStore.authenticatedPlayer !== null"
  >
    {{ playerStore.authenticatedPlayer.nickname }}
  </span>
</template>

<style scoped></style>
