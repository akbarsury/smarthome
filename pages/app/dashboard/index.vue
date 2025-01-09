<template>
  <div>
    <div class="summary mt-2">
      <div class="grid grid-cols-1 gap-8 p-4 lg:grid-cols-2">
        <!-- Value card -->
        <div
          class="flex items-center justify-between p-4 bg-orange-200 rounded-md dark:bg-darker"
          v-for="summaryItem in summaryItems"
        >
          <div>
            <h6
              class="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light"
            >
              {{ summaryItem.title }}
            </h6>
            <span class="text-xl font-semibold">{{ summaryItem.value }}</span>
          </div>
          <div>
            <Icon :name="summaryItem.icon" size="42px" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const summaryItems = ref([
  {
    title: "nodes",
    value: "3",
    icon: "solar:server-outline",
  },
  {
    title: "users",
    value: "2",
    icon: "solar:user-broken",
  },
  {
    title: "today request",
    value: "8",
    icon: "hugeicons:touch-interaction-02",
  },
  {
    title: "latest request",
    value: "21:34",
    icon: "tabler:clock",
  },
]);
</script>

<style scoped></style>
