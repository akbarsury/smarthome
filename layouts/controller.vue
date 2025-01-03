<template>
  <div class="max-w-screen-md mx-auto">
    <div class="container">
      <div class="px-4 mt-2">
        <div class="bg-orange-200 rounded p-2 py-4">
          <div class="flex justify-between">
            <div>
              <h1 class="text-orange-700 text-2xl font-bold">
                Akbar SmartHome Control
              </h1>
            </div>
            <div>
              <button
                class="bg-orange-300 hover:bg-orange-400 border border-orange-500 p-1 px-3 rounded"
                @click.prevent="signOut()"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const signOut = () => {};
</script>

<style scoped></style>
