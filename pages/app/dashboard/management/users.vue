<template>
  <div class="user-management">
    <div class="flex justify-end">
      <div class="mt-2">
        <button
          class="bg-blue-600 text-neutral-50 rounded p-1 px-2"
          @click.prevent="() => (showAddUserModal = true)"
        >
          Add User
        </button>
      </div>
    </div>
    <div class="mt-4">
      <div>
        <div
          class="grid grid-cols-[minmax(auto,_3fr)_minmax(auto,_2fr)_minmax(auto,max-content)] gap-2"
        >
          <div
            class="grid grid-cols-subgrid gap-2 col-span-3 bg-orange-100 hover:bg-orange-200 rounded p-2"
            v-for="user in usersData?.data.users || []"
          >
            <div class="">
              <span class="block"> {{ user.name || "No name" }} </span>
              <span> {{ user.email || "No email" }} </span>
            </div>
            <div class="place-self-center">
              <div class="flex gap-1">
                <div>
                  <span class="bg-green-500 text-xs p-1 px-2 rounded-full">
                    Verified
                  </span>
                </div>
                <div>
                  <span class="bg-yellow-500 text-xs p-1 px-2 rounded-full">
                    admin
                  </span>
                </div>
              </div>
            </div>
            <div class="content-center">
              <div class="flex gap-2">
                <button
                  class="bg-blue-400 hover:bg-blue-600 border-blue-600 rounded p-1 px-2"
                >
                  Edit
                </button>
                <button
                  class="bg-red-400 hover:bg-red-600 border-red-600 rounded p-1 px-2"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="add-user" v-if="showAddUserModal">
      <CompositeModalFullPage @click-outside="() => (showAddUserModal = false)">
        <div class="min-w-[320px]">
          <div class="div">
            <div class="mb-2">
              <h3 class="text-lg font-bold text-center">Add new user</h3>
            </div>
            <div class="flex flex-col gap-4">
              <div class="input-group">
                <label class="block text-neutral-700 mb-2" for="name"
                  >Name</label
                >
                <input
                  class="w-full border border-orange-400 rounded p-1"
                  id="name"
                  type="name"
                  v-model="newUser.data.name"
                />
              </div>
              <div class="input-group">
                <label class="block text-neutral-700 mb-2" for="email"
                  >Email</label
                >
                <input
                  class="w-full border border-orange-400 rounded p-1"
                  id="email"
                  type="email"
                  v-model="newUser.data.email"
                />
              </div>
              <div class="input-group">
                <label class="block text-neutral-700 mb-2" for="email"
                  >Password</label
                >
                <input
                  class="w-full border border-orange-400 rounded p-1"
                  type="password"
                  v-model="newUser.data.password"
                />
              </div>
              <div class="status">
                <div
                  :class="[
                    'rounded p-2 px-4',
                    newUser.status === 'failed' ? 'bg-red-300' : 'bg-green-300',
                  ]"
                  v-if="newUser.status && newUser.status !== 'waiting'"
                >
                  {{ newUser.message }}
                </div>
              </div>
              <div class="add-user-action flex justify-end gap-2">
                <button
                  :class="[
                    'border p-1 px-3 rounded',
                    newUser.status != 'waiting'
                      ? 'bg-red-300 hover:bg-red-400 border-red-500'
                      : 'bg-neutral-400 pointer-events-none',
                  ]"
                  @click.prevent="() => (showAddUserModal = false)"
                >
                  cancel
                </button>
                <button
                  :class="[
                    'border p-1 px-3 rounded',
                    newUser.status != 'waiting'
                      ? 'bg-orange-300 hover:bg-orange-400 border-orange-500'
                      : 'bg-neutral-400 pointer-events-none',
                  ]"
                  @click.prevent="addUser()"
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      </CompositeModalFullPage>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: usersData } = await useFetch("/api/v1.0/users");

const showAddUserModal = ref(false);

const newUser: globalThis.Ref<{
  data: { name?: string; email?: string; password?: string };
  status?: "waiting" | "success" | "failed";
  message?: string;
}> = ref({ data: {} });

const addUser = async () => {
  newUser.value.status = "waiting";
  const { data: addUserResult } = await useFetch("/api/v1.0/users", {
    method: "post",
    body: newUser.value.data,
  });

  if (addUserResult.value?.data.user) {
    newUser.value = {
      data: newUser.value.data,
      status: addUserResult.value.data.user ? "success" : "failed",
      message: addUserResult.value.message,
    };
  }

  setTimeout(async () => {
    if (newUser.value.status === "success")
      await useFetch("/api/v1.0/users").then((_usersData) => {
        usersData.value = _usersData.data.value;
      });
    newUser.value = {
      data: newUser.value.status === "success" ? {} : newUser.value.data,
      status: undefined,
      message: undefined,
    };
  }, 3000);
  return;
};
</script>

<style scoped></style>
