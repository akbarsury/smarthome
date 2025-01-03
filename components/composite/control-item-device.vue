<template>
  <div class="bg-orange-100 border border-orange-300 rounded-lg p-4">
    <div
      class="flex flex-col h-[120px] max-h-[120px] justify-center items-center gap-2"
    >
      <div>
        <Icon
          :name="props.icon"
          size="2.5rem"
          :class="[
            props.currentStatus == 1 ? 'text-green-700' : 'text-red-700',
          ]"
        />
      </div>
      <div class="w-[120px]">
        <span
          class="block text-center font-semibold capitalize whitespace-nowrap truncate max-w-[120px]"
        >
          {{ props.name }}
        </span>
      </div>
      <div>
        <!-- <button
          @click.prevent="action()"
          :class="[
            status == 'on' ? 'bg-orange-400' : 'bg-orange-200',
            'btn hover:bg-orange-300 border border-orange-400 p-1 px-4 rounded',
          ]"
        >
          {{ status !== "on" ? "Turn On" : "Turn Off" }}
        </button> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon: string;
  name: string;
  label: string;
  currentStatus: 0 | 1;
}>();
</script>

<style scoped></style>
