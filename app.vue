<template>
  <div class="controller-work">
    <div>
      WS URL : {{ WSUrl }}
      <pre>
        {{ JSON.parse(messageString) }}
      </pre>
    </div>
    <div>
      <button
        class="p-1 px-4 border border-neutral-800"
        @click.prevent="sendMessage()"
      >
        send messange to socket
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UseWebSocketReturn } from "@vueuse/core/index.js";

const socket: globalThis.Ref<UseWebSocketReturn<any> | undefined> =
  ref(undefined);

const WSUrl = ref("");
const messageString = ref("{}");

const sendMessage = () => {
  if (socket.value) {
    socket.value.send(
      JSON.stringify({
        message: "tes send to server",
      })
    );
  }
};

onMounted(() => {
  WSUrl.value = `${useNitroOrigin()}/socket/smarthome-control/work`;

  socket.value = useWebSocket(WSUrl, {
    onConnected: (ws) => {
      console.log(`ws connected: ${ws.url}`);
      ws.send(JSON.stringify({ req: { message: "client connect" } }));
    },
    onDisconnected: (ws) => {
      console.log(`ws disconnected: ${ws.url}`);
    },
    onMessage(ws, event) {
      console.log(`message from server : ${event.data};`);
      messageString.value = event.data;

      // controlledItems.value = JSON.parse(event.data).sort(
      //   (item1: any, item2: any) => Number(item1.order) - Number(item2.order)
      // );
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
</script>

<style scoped></style>
