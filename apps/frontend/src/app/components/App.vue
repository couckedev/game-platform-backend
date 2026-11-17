<script setup lang="ts">
import { onMounted } from 'vue';
import { usePlayerStore } from '@/player/infrastructure/vuejs';

const playerStore = usePlayerStore();
onMounted(() => {
  playerStore.restoreIdentity();
});
</script>

<template>
  <router-view />
</template>

<style scoped></style>
