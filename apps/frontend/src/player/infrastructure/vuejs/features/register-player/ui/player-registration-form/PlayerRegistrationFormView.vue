<script setup lang="ts">
import { ref } from 'vue';

const nickname = ref('');

interface PlayerRegistrationFormViewEmits {
  registrationFormSubmitted: [nickname: string];
}

const emits = defineEmits<PlayerRegistrationFormViewEmits>();
</script>

<template>
  <h2 id="registration-form-title">Register on Game Platform</h2>
  <form
    aria-labelledby="registration-form-title"
    @submit.preventDefault="emits('registrationFormSubmitted', nickname)"
  >
  </form>
</template>

<style scoped></style>
