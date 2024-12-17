<template>
  <div :class="['server-tools', isFullscreen ? 'fullscreen' : '']">
    <div class="flex flex-col-reverse h-full">
      <div class="tools border border-neutral-900 p-2">
        <div class="flex gap-2">
          <div class="">
            <button
              class="border border-neutral-900 rounded p-1"
              @click.prevent="() => (isFullscreen = !isFullscreen)"
            >
              {{ isFullscreen ? "minimaze" : "fullscreen" }}
            </button>
          </div>
          <div class="init-server" v-if="!isServerInitiated">
            <button
              class="border border-neutral-900 rounded p-1"
              @click.prevent="initServer()"
            >
              init server
            </button>
          </div>
          <div class="" v-else>
            <div class="switch-mode">
              <button
                class="border border-neutral-900 rounded p-1"
                @click.prevent="() => (isServer = !isServer)"
              >
                {{ isServer ? "client" : "server" }}
              </button>
            </div>
          </div>
          <div class="send-message">
            <button
              class="border border-neutral-900 rounded p-1"
              @click.prevent="sendMessage()"
            >
              send message
            </button>
          </div>
        </div>
        {{ { isServerInitiated, isServer } }}
      </div>
      <div class="h-full overflow-auto" v-if="isFullscreen">
        <div v-if="isServer">
          <div class="flex">
            <div class="basis-1/2 p-2">
              <textarea
                class="max-h-[478px] max-auto w-full border border-neutral-900 p-1"
                name="serverMessageArea"
                id=""
                v-model="messageArea.server"
              ></textarea>
            </div>
            <div class="basis-1/2">
              <div class="container">
                <h2 class="font-semibold border border-b-neutral-900">
                  Server logging message
                </h2>
                <div class="border border-b-neutral-900">
                  <ul class="list-decimal list-inside">
                    <li v-for="message in serverMessageLogs">{{ message }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="flex">
            <div class="basis-1/2 p-2">
              <textarea
                class="max-h-[478px] max-auto w-full border border-neutral-900 p-1"
                name="clientMessageArea"
                id=""
                v-model="messageArea.client"
              ></textarea>
            </div>
            <div class="basis-1/2">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UseWebSocketReturn } from "@vueuse/core";

const emits = defineEmits<{ sendMessage: [string] }>();

const isServer = ref(false);
const isServerInitiated = ref(false);

const messageArea = reactive({
  client: "",
  server: "",
});

const sendMessage = () => {
  if (isServerInitiated.value && isServer.value) {
    serverSocket.value?.send(messageArea.server);
    messageArea.server = "";
    console.log("send from server");
  } else {
    emits("sendMessage", messageArea.client);
    messageArea.client = "";
    console.log("send from client");
  }
};

const handleServerSocketResponse = (message: string) => {
  const handler = message.split("::");
  switch (handler[0]) {
    case "ResponsObject":
      break;
    case "ResponsArray":
      switch (handler[1]) {
        case "controlledItems":
          console.log(JSON.parse(handler[2]));
          break;
        default:
          break;
      }
      break;

    default:
      break;
  }
};

const serverMessageLogs: globalThis.Ref<string[]> = ref([]);

const serverSocket: globalThis.Ref<UseWebSocketReturn<any> | undefined> =
  ref(undefined);

const initServer = () => {
  serverSocket.value = useWebSocket(
    `${useNitroOrigin()}/socket/control/office`,
    {
      onConnected: (ws) => {
        ws.send(
          `Assign-node-server::${useRuntimeConfig().public.wsNodeCredential}`
        );
      },
      onDisconnected: (ws) => {
        console.log(`ws disconnected: ${ws.url}`);
        reloadNuxtApp();
      },
      onMessage(ws, event) {
        const messageString = event.data;
        handleServerSocketResponse(messageString);
        serverMessageLogs.value.push(messageString);
      },
      autoReconnect: {
        retries: 3,
        delay: 1000,
        onFailed() {
          console.warn("(Server) Failed to connect WebSocket after 3 retries");
        },
      },
    }
  );
  isServerInitiated.value = true;
};

const unitControlled = ref([
  [false, false],
  [false, false],
  [false, false],
  [false, false],
  [false, false],
]);

const isFullscreen = ref(false);
</script>

<style scoped lang="scss">
.server-tools {
  @apply fixed bottom-0 right-0  left-0 bg-neutral-50 p-1;

  &.fullscreen {
    @apply top-0;
  }
}
</style>
