<script setup lang="ts">
import { onMounted } from 'vue';
import { usePlayerStore } from '@/app/stores/player.store';
const playerStore = usePlayerStore();
onMounted(() => {
  playerStore.restoreIdentity();
});
</script>

<template>
  <router-view />
</template>

<style scoped></style>
