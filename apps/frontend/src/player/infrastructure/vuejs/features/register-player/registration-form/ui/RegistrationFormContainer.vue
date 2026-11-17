<script setup lang="ts">
import { usePlayerStore } from '@/player/infrastructure/vuejs/stores';
import RegistrationFormView from './RegistrationFormView.vue';
import { useI18n } from 'vue-i18n';
import { computed, ref, watchEffect } from 'vue';
import type { RegistrationFormVueProps } from './registration-form-vue-props.interface.ts';

const playerStore = usePlayerStore();

const { t } = useI18n();

const registrationError = computed(() => {
  if (playerStore.registrationErrorCode === null) {
    return null;
  }
  return {
    errorCode: playerStore.registrationErrorCode,
    errorMessage: t(`player.registration.errors.${playerStore.registrationErrorCode}`),
  };
});
</script>

<template>
  <RegistrationFormView
    @submit-registration-form="(nickname: string) => playerStore.register(nickname)"
    :registration-error="registrationError"
  />
</template>

<style scoped></style>
