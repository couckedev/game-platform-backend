<script setup lang="ts">
import { ref } from 'vue';
import type { RegistrationFormVueProps } from './registration-form-vue-props.interface';
import type { RegistrationFormVueEmits } from './registration-form-vue-emits.interface';

const emits = defineEmits<RegistrationFormVueEmits>();
const props = defineProps<RegistrationFormVueProps>();

const nickname = ref('');
</script>
<template>
  <form
    data-testid="player-registration-form"
    @submit.prevent="emits('submitRegistrationForm', nickname)"
  >
    <input
      type="text"
      data-testid="player-registration-form-nickname-input"
      name="nickname"
      v-model="nickname"
    />
    <span
      v-if="props.registrationError !== null"
      data-testid="registration-form-nickname-error"
      :data-error-code="props.registrationError.errorCode"
      >{{ props.registrationError.errorMessage }}</span
    >
    <button type="submit" data-testid="player-registration-form-submit-button">Register</button>
  </form>
</template>

<style scoped></style>
