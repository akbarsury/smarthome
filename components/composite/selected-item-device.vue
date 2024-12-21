<template>
  <div class="fixed bg-neutral-900 bg-opacity-50 top-0 bottom-0 left-0 right-0">
    <div
      :class="[
        'selected-item-device fixed bg-neutral-50 w-[230px] top-0 bottom-0 right-0 p-4 px-6',
        cssHideState ? 'hide' : '',
      ]"
    >
      <div class="text-end">
        <div
          class="inline-block h-[34px] w-[34px] text-center cursor-pointer border border-neutral-400 rounded-full p-1"
          @click.prevent="hideSelectedItemDevice()"
        >
          <Icon name="mingcute:close-fill" />
        </div>
      </div>
      <div class="mb-6">
        <h5 class="text-lg capitalize font-semibold">
          {{ props.selectedItemDevice?.name }}
        </h5>
      </div>
      <div>
        <div class="mb-4">
          <span class="font-semibold"> Action </span>
        </div>
        <div class="flex gap-4">
          <button class="bg-blue-300 rounded p-1 px-2">Power</button>
          <button class="bg-blue-300 rounded p-1 px-2">Restart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  selectedItemDevice?: {
    name: string;
  };
}>();

const emits = defineEmits<{
  hideSelectedItemDevice: [];
}>();

const cssHideState = ref(true);

const hideSelectedItemDevice = () => {
  cssHideState.value = true;
  setTimeout(() => {
    emits("hideSelectedItemDevice");
  }, 600);
};

onMounted(() => {
  setTimeout(() => {
    cssHideState.value = false;
  });
});
</script>

<style scoped lang="scss">
.selected-item-device {
  transition: right 500ms ease-out;
  &.hide {
    right: -250px;
  }
}
</style>
