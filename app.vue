<template>
  <div class="controller-work">
    <div>
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

const socket = ref();

const controlledItems: globalThis.Ref<any[]> = ref([]);

const WSUrl = ref("");
const messageString = ref("{}");

const sendMessage = () => {
  (socket.value as UseWebSocketReturn<any>).send(
    JSON.stringify({
      message: "tes send to server",
    })
  );
};

onMounted(() => {
  WSUrl.value = `${useNitroOrigin()
    .replace("http://", "ws://")
    .replace("https://", "wss://")}/socket/smarthome-control/work`;

  socket.value = useWebSocket(WSUrl, {
    onConnected: (ws) => {
      console.log(`ws connected: ${ws.url}`);
      ws.send(JSON.stringify({ req: { message: "client connect" } }));
    },
    onDisconnected: (ws) => {
      console.log(ws.url);
      console.log("ws disconnected");
    },
    onMessage(ws, event) {
      console.log(`event.data ${event.data};`);
      messageString.value = event.data;
      // controlledItems.value = JSON.parse(event.data).sort(
      //   (item1: any, item2: any) => Number(item1.order) - Number(item2.order)
      // );
    },
  });
});

const switchControl = (e: any) => {
  console.log({ e });
  const messageData = { e };
  socket.value.send(JSON.stringify(messageData));
};
</script>

<style scoped></style>
