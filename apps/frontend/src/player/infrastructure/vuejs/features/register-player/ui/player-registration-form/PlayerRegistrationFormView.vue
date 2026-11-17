<script setup lang="ts">
import { ref } from 'vue';

const nickname = ref('');

interface PlayerRegistrationFormViewEmits {
  registrationFormSubmitted: [nickname: string];
}

const emits = defineEmits<PlayerRegistrationFormViewEmits>();
</script>

<template>
  <form
    data-testid="player-registration-form"
    @submit.preventDefault="emits('registrationFormSubmitted', nickname)"
  >
    <label for="nickname">Nickname</label>
    <input
      type="text"
      data-testid="registration-form-nickname-input"
      id="nickname"
      v-model="nickname"
    />
    <button type="submit" data-testid="registration-form-submit-button">Register an account</button>
  </form>
</template>

<style scoped></style>
