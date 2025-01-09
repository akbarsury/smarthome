<template>
  <div class="controller-work">
    <h4 class="text-lg font-bold mb-4">Server</h4>
    <div class="flex flex-wrap gap-4">
      <ControlItem type="push" icon="uil:server" label="Server 1" />
      <ControlItem type="push" icon="uil:server" label="Server 2" />
      <ControlItem type="push" icon="uil:server" label="Server 3" />
      <ControlItem type="push" icon="uil:server" label="Server 4" />
      <ControlItem type="push" icon="uil:server" label="Server 5" />
      <ControlItem type="push" icon="uil:server" label="Server 6" />
      <ControlItem type="push" icon="uil:server" label="Server 7" />
      <ControlItem type="push" icon="uil:server" label="Server 8" />
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
