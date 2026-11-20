<script setup lang="ts">
import { ref } from 'vue';
import type { PlayerRegistrationFormViewProps } from './player-registration-form-view-props.interface';
import type { PlayerRegistrationFormViewEmits } from './player-registration-form-view-emits.interface';

const nickname = ref('');

const props = defineProps<PlayerRegistrationFormViewProps>();
const emits = defineEmits<PlayerRegistrationFormViewEmits>();
</script>

<template>
  <form
    data-testid="player-registration-form"
    @submit.prevent="emits('registrationFormSubmitted', nickname)"
  >
    <label for="nickname">Nickname</label>
    <input
      type="text"
      data-testid="registration-form-nickname-input"
      id="nickname"
      v-model="nickname"
    />
    <span
      v-for="error of props.registrationFormErrors.nickname"
      role="error"
      :data-error-code="error.code"
      >{{ error.label }}</span
    >
    <button
      type="button"
      data-testid="registration-form-cancel-button"
      @click="emits('registrationCanceled')"
    >
      Cancel
    </button>
    <button type="submit" data-testid="registration-form-submit-button">Register an account</button>
  </form>
</template>

<style scoped></style>
