<script setup lang="ts">
import { usePlayerStore } from '@/player/infrastructure/vuejs';

const playerStore = usePlayerStore();
</script>

<template>
  <nav aria-label="Main navigation" v-if="!playerStore.isRegistering">
    <router-link :to="{ name: 'sign-in' }">Sign in</router-link>
    <a href="#" v-if="playerStore.hasSignedIn && playerStore.authenticatedPlayer !== null">
      {{ playerStore.authenticatedPlayer.nickname }}
    </a>
  </nav>
</template>

<style scoped></style>
