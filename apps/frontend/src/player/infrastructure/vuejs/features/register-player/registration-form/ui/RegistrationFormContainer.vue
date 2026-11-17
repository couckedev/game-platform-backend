<script setup lang="ts">
import { usePlayerStore } from '@/player/infrastructure/vuejs/stores';
import RegistrationFormView from './RegistrationFormView.vue';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

const playerStore = usePlayerStore();

const { t } = useI18n();

const nicknameErrors = computed(() => {
  return playerStore.registrationFormErrors.nickname.map((registrationErrorCode) => ({
    errorCode: registrationErrorCode,
    errorMessage: t(`player.registration.errors.${registrationErrorCode}`),
  }));
});

const handleRegistrationFormSubmit = (nickname: string) => playerStore.register(nickname);
</script>

<template>
  <RegistrationFormView
    @submit-registration-form="handleRegistrationFormSubmit"
    :nickname-errors="nicknameErrors"
  />
</template>

<style scoped></style>
