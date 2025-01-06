<template>
  <div class="container h-full">
    <div
      class="flex gap-6 py-6 mx-4"
      v-if="useAppConfig().resolvedOriginRouting === 'guest'"
    >
      <div class="">
        <div class="mb-6">
          <h2 class="text-3xl font-bold text-orange-700 mb-4">
            Welcome to Smarthome Assistant
          </h2>
          <p>See what's happening at home even if you're not there</p>
        </div>
        <div>
          <NuxtLink
            :to="
              useRequestURL().protocol.concat('//', useAppConfig().appOrigin)
            "
            class="text-[#055264] hover:text-orange-300 font-semibold bg-[#72a2ad] hover:bg-[#055264] border border-[#055264] p-2 px-6 rounded-full"
          >
            OPEN APP
          </NuxtLink>
        </div>
      </div>
      <div class="">
        <NuxtImg src="home-assistant.png" />
      </div>
    </div>
    <div
      class="flex justify-center items-center gap-6 h-full py-6 mx-4"
      v-if="useAppConfig().resolvedOriginRouting === 'app'"
    >
      <div class="">
        <NuxtImg src="home-assistant.png" height="132px" />
      </div>
      <div class="">
        <div class="mb-6">
          <h2 class="text-2xl font-bold text-orange-700 mb-2">
            Smarthome Assistant
          </h2>
        </div>
        <div>
          <p class="font-semibold text-neutral-800">
            <span
              class="loader-buble-1 h-[30px] w-[30px] border-4 border-neutral-600 mr-4"
            ></span>
            <span class="inline-block align-top mt-1"
              >Dashboard is loading</span
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "home",
  auth: false,
  layout: false,
});

const auth = useAuth();
if (
  useAppConfig().resolvedOriginRouting === "app" &&
  auth.status.value === "unauthenticated"
) {
  navigateTo({ name: "app-auth-signin" });
} else if (
  useAppConfig().resolvedOriginRouting === "app" &&
  auth.status.value === "authenticated"
) {
  navigateTo({ name: "app-dashboard" });
}
</script>

<style scoped></style>
