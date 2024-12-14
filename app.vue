<template>
  <NuxtLayout
    :name="$route.name?.toString().startsWith('auth') ? 'auth' : 'controller'"
  >
    <NuxtPage />
    <div>
      <!-- {{ { session } }} -->
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
// const { getSession } = useAuth();
// const session = await getSession();
</script>

<style scoped></style>
