<template>
  <div class="controller-wrapper">
    <div class="flex flex-col gap-6 py-6">index {{ $route.name }}</div>
    <div class="flex flex-col gap-6 py-6">index {{ { stream } }}</div>
  </div>
</template>

<script setup lang="ts">
import { WebSocketSSE } from "crossws/websocket/sse";

definePageMeta({});

const stream: globalThis.Ref<WebSocketSSE | undefined> = ref(undefined);
</script>

<style scoped></style>
