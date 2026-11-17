<script setup lang="ts">
import { usePlayerStore } from '@/player/infrastructure/vuejs';

const playerStore = usePlayerStore();
</script>

<template>
  <nav aria-label="Main navigation">
    <router-link :to="{ name: 'sign-in' }">Sign in</router-link>
  </nav>
</template>

<style scoped></style>
