<template>
  <div class="controller-work">
    <h4 class="text-lg font-bold mb-4">Office</h4>
    <div
      :class="[
        'flex flex-wrap gap-4 h-[170px] controlledItems-wrapper',
        controlledItems.length === 0 ? 'loading' : '',
      ]"
    >
      <ControlItem
        v-for="controlledItem in controlledItems"
        :name="controlledItem.name"
        :label="controlledItem.label"
        :type="controlledItem.type"
        :icon="controlledItem.icon"
        initial-status="on"
        @action="(e) => switchControl(e)"
      />
      <!-- <ControlItem type="push" icon="cuida:lamp-outline" label="Lamp" />
      <ControlItem type="push" icon="cuida:lamp-outline" label="Work Lamp" />
      <ControlItem type="push" icon="mingcute:speaker-line" label="Speaker" /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UseWebSocketReturn } from "@vueuse/core/index.js";

const socket: globalThis.Ref<UseWebSocketReturn<any> | undefined> =
  ref(undefined);

const controlledItems: globalThis.Ref<any[]> = ref([]);

const WSUrl = ref("");

const logMessages: globalThis.Ref<string[]> = ref([]);

const handleSocketResponse = (message: string) => {
  const handler = message.split("::");
  switch (handler[0]) {
    case "ResponsObject":
      break;
    case "ResponsArray":
      switch (handler[1]) {
        case "controlledItems":
          console.log(JSON.parse(handler[2]));
          controlledItems.value = JSON.parse(handler[2]);
          break;
        default:
          break;
      }
      break;

    default:
      break;
  }
};

onMounted(() => {
  WSUrl.value = `${useNitroOrigin()}/socket/control/office`;

  socket.value = useWebSocket(WSUrl, {
    onConnected: (ws) => {
      console.log(`ws connected: ${ws.url}`);
      ws.send("Client-init");
    },
    onDisconnected: (ws) => {
      console.log(`ws disconnected: ${ws.url}`);
    },
    onMessage(ws, event) {
      const messageString = event.data;
      console.log(`message from server : ${messageString}`);
      handleSocketResponse(messageString);
    },
    autoReconnect: {
      retries: 3,
      delay: 1000,
      onFailed() {
        console.warn("Failed to connect WebSocket after 3 retries");
      },
    },
  });
});

const sendMessage = () => {
  if (socket.value) {
    socket.value.send(
      JSON.stringify({
        message: "tes send to server",
      })
    );
  }
};

const switchControl = (e: any) => {
  console.log({ e });
  const messageData = { e };
  socket.value?.send(JSON.stringify(messageData));
};
</script>

<style scoped lang="scss">
.controlledItems-wrapper.loading {
  @apply relative bg-orange-200 rounded-lg overflow-hidden;
  &::after {
    content: "";
    transform: rotate(30deg) translateY(-40%);
    opacity: 0.7;
    @apply absolute h-[250%] w-[20rem] bg-gradient-to-r
      from-orange-200 via-orange-300 to-orange-200;
    animation: controledItems-loader ease-out 1.5s infinite;
  }
}

@keyframes controledItems-loader {
  0% {
    left: -60%;
  }
  100% {
    left: 100%;
  }
}
</style>
