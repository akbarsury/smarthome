<template>
  <div class="controller-work">
    <h4 class="text-lg font-bold mb-4">Veranda</h4>
    <div class="flex flex-wrap gap-4">
      <ControlItem
        type="push"
        icon="cuida:lamp-outline"
        label="Front Home Lamp"
      />
      <ControlItem
        type="push"
        icon="cuida:lamp-outline"
        label="Back Home Lamp"
      />
      <ControlItem
        type="push"
        icon="cuida:lamp-outline"
        label="Left Home Lamp babablaa"
      />
      <ControlItem
        type="push"
        icon="cuida:lamp-outline"
        label="Right Home Lamp"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const socket = ref();

onMounted(() => {
  socket.value = useWebSocket(
    `ws://${location.host}/socket/smarthome-control/work`
  );
});

const switchControl = (target: string, action: "turn on" | "turn off") => {
  const messageData = { target, action };
  socket.value.send(JSON.stringify(messageData));
};
</script>

<style scoped></style>
