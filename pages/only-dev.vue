<template>
  <div class="container py-2 mb-[60px]">
    <div class="controller-work">
      <div class="controller-wrapper">
        <div class="flex flex-col gap-6">
          <RoomControlOffice />
        </div>
      </div>
    </div>
    <ServerComponent @sendMessage="(message) => sendMessage(message)">
      <div class="container">
        <h2 class="font-semibold border border-b-neutral-900">
          Client logging message
        </h2>
        <div class="border border-b-neutral-900">
          <ul class="list-decimal list-inside">
            <li v-for="(logMessage, i) in logMessages">
              {{ logMessage }}
            </li>
          </ul>
        </div>
      </div>
    </ServerComponent>
  </div>
</template>

<script setup lang="ts">
import type { UseWebSocketReturn } from "@vueuse/core/index.js";

const socket: globalThis.Ref<UseWebSocketReturn<any> | undefined> =
  ref(undefined);

const controlledItems: globalThis.Ref<any[]> = ref([]);

const sendMessage = (message: string) => {
  if (socket.value) {
    socket.value.send(message);
  }
};

const logMessages: globalThis.Ref<string[]> = ref([]);

onMounted(() => {
  socket.value = useWebSocket(`${useNitroOrigin()}/socket/control/office`, {
    onConnected: (ws) => {
      ws.send("Client-init");
    },
    onDisconnected: (ws) => {
      console.log(`ws disconnected: ${ws.url}`);
      reloadNuxtApp();
    },
    onMessage(ws, event) {
      if (typeof event.data === "string") {
        logMessages.value.push(event.data);
        const data = useSmarthomeWebsocket().messageHandler(event.data);
      }
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
