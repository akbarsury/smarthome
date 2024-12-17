<template>
  <NuxtLayout
    :name="$route.name?.toString().startsWith('auth') ? 'auth' : 'controller'"
  >
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts"></script>

<style scoped></style>
