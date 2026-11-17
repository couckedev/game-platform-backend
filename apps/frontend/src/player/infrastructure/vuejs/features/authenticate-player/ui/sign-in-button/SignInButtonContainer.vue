<script setup lang="ts">
import { usePlayerStore } from '@/player/infrastructure/vuejs';
import SignInButtonView from './SignInButtonView.vue';
import type { Provider } from '@/player/infrastructure/authentication/common';

const playerStore = usePlayerStore();

interface Label {
  text: string;
}
const props = defineProps<{
  provider: Provider;
}>();

const onSignInButtonClicked = async () => {
  await playerStore.signInWith(props.provider);
};

const labelByProvider = new Map<Provider, Label>([['google', { text: 'Sign in with Google' }]]);
const displayLabelContent = (provider: Provider) => {
  const label = labelByProvider.get(provider);
  if (label === undefined) {
    throw new Error(`Unknown sign in button label for provider ${provider}`);
  }
  return label.text;
};
</script>

<template>
  <SignInButtonView @click="onSignInButtonClicked">
    {{ displayLabelContent(props.provider) }}
  </SignInButtonView>
</template>

<style scoped></style>
