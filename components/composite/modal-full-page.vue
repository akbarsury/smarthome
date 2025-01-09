<template>
  <div class="modal-full-page grid p-4">
    <div class="max-w-screen-md mx-auto">
      <div class="container">
        <div class="bg-neutral-50 w-full p-4 rounded-md" ref="modalContent">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  clickOutside: [];
}>();

const modalContent = ref(null);

onClickOutside(modalContent, () => emits("clickOutside"));
</script>

<style scoped lang="scss">
.modal {
  &-full-page {
    &::before {
      @apply content-[''] absolute top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-35 z-[-1];
    }
    @apply fixed top-0 bottom-0 left-0 right-0;
  }
}
</style>
