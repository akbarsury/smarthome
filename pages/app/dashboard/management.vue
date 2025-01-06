<template>
  <div>
    <div
      class="grid grid-cols-[auto_1fr] border border-orange-200 rounded-xl p-2 px-4"
    >
      <div class="min-w-[78px]">
        <ul>
          <li>
            <NuxtLink
              class="hover:underline"
              :to="{ name: 'app-dashboard-management-users' }"
            >
              User Management
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              class="hover:underline"
              :to="{ name: 'app-dashboard-management-nodes' }"
            >
              Node Management
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div
        class="relative w-full overflow-hidden pl-2 ml-4 border-s border-orange-200"
      >
        <NuxtPage
          class="relative right-0 w-full h-full"
          :transition="{
            name: 'expand-right',
            mode: 'in-out',
          }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useIntervalFn(() => {
  if (useRoute().name === "app-dashboard-management") {
    useRouter().replace({ name: "app-dashboard-management-users" });
  }
}, 500);
</script>

<style scoped lang="scss">
.expand-right-leave-active {
  transition: right 0.5s;
}
.expand-right-enter-active {
  transition: all 0.5s;
  // transition-delay: 1s;
}
.expand-right-leave-to {
  position: absolute;
  right: 100%;
}
.expand-right-enter-from {
  position: absolute;
  right: 100%;
}
</style>
