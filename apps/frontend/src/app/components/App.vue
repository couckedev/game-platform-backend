<script setup lang="ts">
import { usePlayerStore } from '@/app/stores/player.store';
import { onMounted } from 'vue';

const playerStore = usePlayerStore();
onMounted(() => {
  playerStore.restoreIdentity();
});
</script>

<template>
  <router-view />
</template>

<style scoped></style>
