<script setup lang="ts">
import { usePlayerStore } from '../stores/player.store';

const playerStore = usePlayerStore();
</script>

<template>
  <router-link
    v-if="!playerStore.hasSignedIn"
    :to="{ name: 'sign-in' }"
    data-testid="sign-in-navigation-link"
    >Sign in</router-link
  >
  <button v-if="playerStore.hasSignedIn" data-testid="sign-out-navigation-button">Sign out</button>
</template>

<style scoped></style>
