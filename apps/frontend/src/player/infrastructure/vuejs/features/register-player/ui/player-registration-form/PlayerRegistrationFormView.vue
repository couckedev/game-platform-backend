<script setup lang="ts">
import { ref } from 'vue';
import type { PlayerRegistrationFormViewEmits } from './player-registration-form-view-emits.interface';

const nickname = ref('');

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
    <button type="submit">Register an account</button>
  </form>
</template>

<style scoped></style>
