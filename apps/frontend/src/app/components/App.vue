<script setup lang="ts"></script>

<template>
  <nav aria-label="Main navigation">
    <router-link :to="{ name: 'sign-in' }">Sign in</router-link>
  </nav>
  <router-view />
    
</template>

<style scoped></style>
