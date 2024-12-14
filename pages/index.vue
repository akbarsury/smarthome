<template>
  <div class="controller-wrapper">
    <div class="flex flex-col gap-6 py-6">
      <RoomControlOffice />
      <!-- <ServerControl />
      <RoomControlVeranda /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: false,
    navigateUnauthenticatedTo: "/login",
  },
});
</script>

<style scoped></style>
