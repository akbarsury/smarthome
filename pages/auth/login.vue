<template>
  <div class="container">
    <div class="min-h-screen h-auto flex justify-center items-center">
      <div class="border border-orange-500 p-6 rounded-xl">
        <div class="mb-5">
          <h3 class="text-xl font-bold text-center">Akbar Smarthome</h3>
        </div>
        <div class="flex flex-col gap-4">
          <div class="input-group">
            <input
              class="border border-orange-400 rounded p-1"
              type="email"
              placeholder="youremail@domain.com"
              v-model="authCredentials.email"
            />
          </div>
          <div class="input-group">
            <input
              class="border border-orange-400 rounded p-1"
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
  path: "/login",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});

// const { signIn: _signIn } = useAuth();
const authCredentials = reactive({
  email: "",
  password: "",
});

const signIn = () => {
  // _signIn("akbarSmarthomeAuthentication", authCredentials);
};
</script>

<style scoped></style>
