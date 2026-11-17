<script setup lang="ts">
import { usePlayerStore } from '@/player/infrastructure/vuejs/stores';
import { onMounted } from 'vue';

const playerStore = usePlayerStore();
onMounted(async () => {
  await playerStore.restoreIdentity();
});
</script>

<template>
  <router-view />
</template>

<style scoped></style>
