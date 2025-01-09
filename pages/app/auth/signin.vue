<template>
  <div class="container h-full px-4">
    <div class="flex justify-center items-center h-full">
      <div class="border border-orange-500 p-6 rounded-xl">
        <div class="mb-5">
          <h3 class="w-2/3 text-xl font-bold text-center mx-auto">
            Smarthome Assistant Login
          </h3>
        </div>
        <div class="flex flex-col gap-4">
          <div class="input-group">
            <label class="block text-neutral-700 mb-2" for="email">Email</label>
            <input
              class="w-[308px] border border-orange-400 rounded p-1"
              id="email"
              type="email"
              v-model="authCredentials.email"
            />
          </div>
          <div class="input-group">
            <label class="block text-neutral-700 mb-2" for="email"
              >Password</label
            >
            <input
              class="w-[308px] border border-orange-400 rounded p-1"
              type="password"
              v-model="authCredentials.password"
            />
          </div>
          <div class="login-action text-center">
            <button
              class="bg-orange-300 hover:bg-orange-400 border border-orange-500 p-1 px-3 rounded"
              @click.prevent="signIn()"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  path: "/signin",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});

const { signIn: _signIn } = useAuth();
const authCredentials: globalThis.Ref<{
  email?: string;
  password?: string;
  token?: string;
}> = ref({});

const signIn = async () => {
  const { data: signinResponse } = await useFetch("/api/v1.0/auth/signin", {
    method: "post",
    body: authCredentials,
  });
  console.log({ signinResponse });
  if (signinResponse.value?.status === "valid") {
    authCredentials.value.token = signinResponse.value.token;
    _signIn("ArahSmarthomeCredentialProvider", authCredentials.value);
  }
};
</script>

<style scoped></style>
