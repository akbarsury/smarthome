<template>
  <div class="dashboard">
    <div class="management m-4" v-if="$route.name !== 'app-dashboard'">
      <div class="mb-4">
        <h6 class="text-neutral-700 capitalize font-semibold">
          {{ $route.path.split("/")[2] }}
        </h6>
      </div>
      <NuxtPage />
    </div>
    <NuxtPage v-else />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  path: "/dashboard",
});
</script>

<style scoped></style>
