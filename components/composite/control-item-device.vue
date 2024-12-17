<template>
  <div class="bg-orange-100 border border-orange-300 rounded-lg p-4">
    <div
      class="flex flex-col h-[120px] max-h-[120px] justify-center items-center gap-2"
    >
      <div>
        <Icon
          :name="props.icon"
          size="2.5rem"
          :class="[status == 'on' ? 'text-green-700' : 'text-red-700']"
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
  type: "switch" | "push";
  icon: string;
  name: string;
  label: string;
  initialStatus?: "on" | "off";
  pushTime?: number;
  forceOn?: boolean;
  forceOff?: boolean;
}>();

type ControlItemType = typeof props.type;
type EmitActionReturn = {
  message: string;
};

const emits = defineEmits<{
  (e: "action", message: EmitActionReturn): void;
  (e: "tes"): void;
}>();

const action = () => {
  console.log("action click");

  const { label } = props;
  if (props.type == "switch") {
    const messageData = { target: label };
    emits("action", { message: JSON.stringify(messageData) });
    return { message: JSON.stringify(messageData) };
  } else {
    const messageData = { target: label };
    return { message: JSON.stringify(messageData) };
  }
};

const status: globalThis.Ref<"on" | "off"> = ref("off");

onMounted(() => {
  status.value = props.initialStatus || status.value;
});
</script>

<style scoped></style>
