<script setup lang="ts">
import { ref } from 'vue';

const hasSignedIn = ref(false);

const signInWithGoogle = () => (hasSignedIn.value = true);
</script>

<template>
  <div data-testid="sign-in-page">
    <button
      v-if="!hasSignedIn"
      type="button"
      data-testid="sign-in-with-google-button"
      @click="signInWithGoogle"
    >
      Sign in with Google
    </button>
  </div>
</template>

<style scoped></style>
