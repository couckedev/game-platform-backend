<script setup lang="ts">
import { usePlayerStore } from '@/player/infrastructure/vuejs';
import PlayerRegistrationFormView from './PlayerRegistrationFormView.vue';

usePlayerStore();
</script>

<template>
  <PlayerRegistrationFormView />
</template>

<style scoped></style>
