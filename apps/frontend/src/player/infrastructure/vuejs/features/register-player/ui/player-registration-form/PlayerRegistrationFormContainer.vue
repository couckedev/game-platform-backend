<script setup lang="ts">
import { usePlayerStore } from '@/player/infrastructure/vuejs';
import PlayerRegistrationFormView from './PlayerRegistrationFormView.vue';

const playerStore = usePlayerStore();

const onRegistrationFormSubmitted = (nickname: string) => playerStore.register(nickname);
</script>

<template>
  <PlayerRegistrationFormView
    @registration-form-submitted="onRegistrationFormSubmitted"
    :registration-form-errors="playerStore.registrationFormErrors"
  />
</template>

<style scoped></style>
