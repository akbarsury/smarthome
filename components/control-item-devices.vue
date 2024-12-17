<template>
  <div class="controller-work">
    <div class="container">
      <h4 class="text-xl capitalize font-bold mb-4">
        {{ props.unitName }}
      </h4>
    </div>
    <div
      :class="[
        'flex flex-col gap-4 controlled-items-wrapper',
        controlledItems.length === 0 ? 'loading' : '',
      ]"
    >
      <div class="flex flex-wrap justify-end gap-4 min-h-[25px]">
        <div class="flex">
          <button class="bg-green-300 p-1 px-2 rounded">Add device</button>
        </div>
      </div>
      <div class="flex flex-wrap gap-4 min-h-[120px]">
        <CompositeControlItemDevice
          class="cursor-pointer hover:bg-orange-200 shadow-lg hover:shadow-orange-300"
          v-for="controlledItem in controlledItems"
          :name="controlledItem.name"
          :label="controlledItem.label"
          :type="controlledItem.type"
          :icon="controlledItem.icon"
          initial-status="on"
          @click.prevent="itemDeviceClick().show(controlledItem.label)"
          @action="() => {}"
        />
      </div>
    </div>
    <!-- <div
      :class="[
        'flex flex-col gap-4 controlled-items-wrapper',
        controlledItems.length === 0 ? 'loading' : '',
      ]"
      v-else
    >
      <div class="flex flex-wrap gap-4 min-h-[25px]">
        <div class="flex">
          <button
            class="bg-green-300 p-1 px-2 rounded"
            @click.prevent="backToDevices()"
          >
            Back to devices
          </button>
        </div>
      </div>
      <div class="flex flex-wrap gap-4 h-[170px]">Device</div>
    </div> -->
    <div
      class="fixed bg-neutral-900 bg-opacity-50 top-0 bottom-0 left-0 right-0"
      v-if="
        $route.query['device'] &&
        controlledItems.length !== 0 &&
        selectedItemDevice !== -111
      "
    >
      <div
        :class="[
          'selected-item-device fixed bg-neutral-50 w-[230px] top-0 bottom-0 right-0 p-4 px-6',
          selectedItemDevice <= -1 ? 'hide' : '',
        ]"
      >
        <div class="text-end">
          <div
            class="inline-block h-[34px] w-[34px] text-center cursor-pointer border border-neutral-400 rounded-full p-1"
            @click.prevent="itemDeviceClick().hide()"
          >
            <Icon name="mingcute:close-fill" />
          </div>
        </div>
        <div class="mb-6">
          <h5 class="text-lg font-semibold">Komputer</h5>
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
  </div>
</template>

<script setup lang="ts">
import type { UseWebSocketReturn } from "@vueuse/core/index.js";

const props = defineProps<{
  unitName: string;
}>();

const socket: globalThis.Ref<UseWebSocketReturn<any> | undefined> =
  ref(undefined);

const controlledItems: globalThis.Ref<any[]> = ref([]);

const logMessages: globalThis.Ref<string[]> = ref([]);

const selectedItemDevice = ref(-111);

const itemDeviceClick = () => {
  const show = (itemLabel?: string) => {
    let _selectedItemDevice = controlledItems.value.findIndex(
      (controledItem) => {
        return controledItem.label == itemLabel;
      }
    );
    if (_selectedItemDevice !== -1) {
      selectedItemDevice.value = -1;
      try {
        useRouter()
          .push({
            path: useRoute().path,
            query: {
              device: itemLabel,
            },
          })
          .then(() => {
            setTimeout(() => {
              selectedItemDevice.value = _selectedItemDevice;
            }, 100);
          });
      } finally {
        return selectedItemDevice.value;
      }
    } else {
      return -1;
    }
  };
  const hide = () => {
    selectedItemDevice.value = -1;
    setTimeout(() => {
      backToDevices();
    }, 600);
  };
  return { show, hide };
};

const backToDevices = () => {
  useRouter().push({
    path: useRoute().path,
  });
};

onMounted(() => {
  socket.value = useWebSocket(
    `${useNitroOrigin()}/socket/control/${props.unitName}`,
    {
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

          if (data) {
            console.log(Object.keys(data));
          }
          if (
            data &&
            data?.type === "object" &&
            data?.name == "controlledItems"
          ) {
            controlledItems.value = data.data as any[];
          }
        }
      },
      autoReconnect: {
        retries: 3,
        delay: 1000,
        onFailed() {
          console.warn("Failed to connect WebSocket after 3 retries");
        },
      },
    }
  );
});
</script>

<style scoped lang="scss">
.controlled-items-wrapper.loading > div {
  @apply relative bg-orange-200 rounded-lg overflow-hidden;
  * {
    opacity: 0;
    pointer-events: none;
    cursor: none;
  }
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

.selected-item-device {
  transition: right 500ms ease-out;
  &.hide {
    right: -250px;
  }
}
</style>
