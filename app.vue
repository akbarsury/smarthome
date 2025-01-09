<template>
  <NuxtLayout :name="appLayout" v-if="resolvedOriginRouting != undefined">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const ws_user = useWsStore().user;

updateAppConfig({
  origin: useRequestURL().host.startsWith("app.")
    ? useRequestURL().host.replace("app.", "")
    : useRequestURL().host,
  appOrigin: useRequestURL().host.startsWith("app.")
    ? useRequestURL().host
    : "app.".concat(useRequestURL().host),
});

if (
  useRequestURL().host.startsWith("app.") &&
  (useRoute().name?.toString().startsWith("app-") ||
    useRoute().name?.toString() === "home")
)
  updateAppConfig({
    resolvedOriginRouting: "app",
  });
else if (!useRequestURL().host.startsWith("app.") && useRoute().name)
  updateAppConfig({
    resolvedOriginRouting: "guest",
  });

const appLayout = computed(() =>
  useRequestURL().host.startsWith("app.") ? "app" : "guest"
);

if (
  appLayout.value === "guest" &&
  useRoute().name?.toString().startsWith("app-")
) {
  const redirecURL = useRequestURL().protocol.concat(
    "//",
    useAppConfig().appOrigin,
    useRoute().fullPath
  );
  navigateTo(redirecURL, { external: true });
}

const resolvedOriginRouting = computed(
  () => useAppConfig().resolvedOriginRouting
);

onMounted(async () => {
  if (
    useAppConfig().resolvedOriginRouting === "app" &&
    useAuth().status.value === "authenticated"
  ) {
    ws_user ? await useWsStore().init() : true;
  }
});
</script>

<style scoped></style>
