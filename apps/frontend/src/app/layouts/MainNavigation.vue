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
</template>

<style scoped></style>
