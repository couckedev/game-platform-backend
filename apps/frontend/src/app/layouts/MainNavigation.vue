<script setup lang="ts">
import { usePlayerStore } from '@/player/infrastructure/vuejs';

const playerStore = usePlayerStore();
</script>

<template>
  <router-link :to="{ name: 'sign-in' }" data-testid="sign-in-navigation-link">Sign in</router-link>
</template>

<style scoped></style>
