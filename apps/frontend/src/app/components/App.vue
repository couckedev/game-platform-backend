<script setup lang="ts"></script>

<template>
    <router-link :to="{ name: 'sign-in' }"  data-testid="signin-navigation-link">Sign in</router-link>
  
  <router-view />
    
</template>

<style scoped></style>
