<script setup lang="ts">
import { ref } from 'vue';
import type { PlayerRegistrationFormViewProps } from './player-registration-form-view-props.interface';
import type { PlayerRegistrationFormViewEmits } from './player-registration-form-view-emits.interface';

const nickname = ref('');

const props = defineProps<PlayerRegistrationFormViewProps>();
const emits = defineEmits<PlayerRegistrationFormViewEmits>();
</script>

<template>
  <h2 id="registration-form-title">Register on Game Platform</h2>
  <form
    aria-labelledby="registration-form-title"
    @submit.preventDefault="emits('registrationFormSubmitted', nickname)"
  >
    <label for="nickname">Nickname</label>
    <input
      type="text"
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
