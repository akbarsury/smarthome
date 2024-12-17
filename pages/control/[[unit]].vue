<template>
  <div class="container px-4">
    <div class="controller-wrapper">
      <div class="flex flex-col gap-6 py-4">
        <ControlItemDevices
          :unit-name="unitName"
          v-if="
            unitName &&
            ($route.path.split('/').length < 4 ||
              $route.path.split('/')[3] === '')
          "
        />
        <NuxtPage v-else />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const unitName = useRoute().path.split("/")[2];
</script>

<style scoped></style>
