<template>
  <div class="container px-4">
    <div class="controller-wrapper">
      <div class="flex flex-col gap-6 py-4">
        {{ { routeName: $route.name, unitName } }}
        <ControlItemDevices :unit-name="unitName" v-if="unitName" />
        <NuxtPage v-else />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const unitName = useRoute().params["unit"].toString();
</script>

<style scoped></style>
