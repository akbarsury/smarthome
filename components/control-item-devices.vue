<template>
  <div class="controller-work">
    <div class="flex flex-col gap-4 controlled-items-wrapper">
      <div :class="['container', controlledItemsLoaded]">
        <div class="flex justify-between items-center min-h-[25px] h-auto">
          <div>
            <h4 class="text-xl capitalize font-bold">
              {{ props.unitName }}
            </h4>
          </div>
          <div class="flex flex-wrap gap-4">
            <button
              class="bg-green-300 hover:bg-green-400 border border-green-500 p-1 px-2 rounded"
            >
              Add device
            </button>
          </div>
        </div>
      </div>
      <div :class="['container', controlledItemsLoaded]">
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
    </div>
    <CompositeSelectedItemDevice
      v-if="
        $route.query['device'] &&
        controlledItems?.length !== 0 &&
        selectedItemDevice !== -111
      "
      :selected-item-device="(selectedItemDevice as any) || undefined"
      @hide-selected-item-device="itemDeviceClick().hide()"
    />
  </div>
</template>

<script setup lang="ts">
import type { UseWebSocketReturn } from "@vueuse/core/index.js";

const props = defineProps<{
  unitName: string;
}>();

const socket: globalThis.Ref<UseWebSocketReturn<any> | undefined> =
  ref(undefined);

const controlledItems: globalThis.Ref<any[] | undefined> = ref(undefined);

const controlledItemsLoaded = computed(() =>
  controlledItems.value === undefined ? "skeleton-loader" : ""
);

const logMessages: globalThis.Ref<string[]> = ref([]);

const selectedItemDevice: globalThis.Ref<{} | undefined> = ref(undefined);

const itemDeviceClick = () => {
  const show = (itemLabel?: string) => {
    let _selectedItemDevice = controlledItems.value?.find(
      (controledItem) => controledItem.label == itemLabel
    );
    if (_selectedItemDevice) {
      useRouter()
        .push({
          path: useRoute().path,
          query: {
            device: itemLabel,
          },
        })
        .then(() => {
          selectedItemDevice.value = _selectedItemDevice || undefined;
        });
    }
  };
  const hide = () => {
    backToDevices().then(() => {
      selectedItemDevice.value = undefined;
    });
  };
  return { show, hide };
};

const backToDevices = () => {
  return useRouter().push({
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

<style scoped lang="scss"></style>
