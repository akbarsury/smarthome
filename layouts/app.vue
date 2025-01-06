<template>
  <div
    :class="[
      'max-w-screen-md mx-auto min-h-screen grid',
      $route.name !== 'home' && !$route.name?.toString().startsWith('app-auth-')
        ? 'grid-rows-[auto_1fr]'
        : 'grid-rows-[1fr]',
    ]"
  >
    <div
      class="container h-fit"
      v-if="
        $route.name !== 'home' &&
        !$route.name?.toString().startsWith('app-auth-')
      "
    >
      <div class="px-4 mt-2">
        <div class="bg-orange-200 rounded p-2 py-4">
          <div class="flex justify-between">
            <div>
              <NuxtLink :to="{ name: 'home' }">
                <h1 class="text-orange-700 text-2xl font-bold">
                  Smarthome Control
                  {{
                    $route.name !== "home" &&
                    !$route.name?.toString().startsWith("app-auth-")
                  }}
                </h1>
              </NuxtLink>
            </div>
            <div v-if="!$route.name?.toString().startsWith('auth')">
              <div class="flex gap-2" v-if="authStatus === 'authenticated'">
                <div>
                  <NuxtLink
                    :to="{ name: 'app-dashboard-nodes' }"
                    class="inline-block bg-green-300 hover:bg-green-400 border border-green-500 p-1 px-3 rounded"
                  >
                    Nodes
                  </NuxtLink>
                </div>
                <div>
                  <button
                    class="bg-orange-300 hover:bg-orange-400 border border-orange-500 p-1 px-3 rounded"
                    @click.prevent="signOut()"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
const { status: authStatus, signOut: authSignOut } = useAuth();
const signOut = () => {
  authSignOut({
    redirect: false,
  }).then(() => {
    navigateTo({ name: "home" });
  });
};
</script>

<style scoped></style>
