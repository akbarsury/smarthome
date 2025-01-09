<template>
  <div class="user-management">
    <div class="flex justify-end">
      <div class="mt-2">
        <button
          class="bg-blue-600 text-neutral-50 rounded p-1 px-2"
          @click.prevent="() => addUser.open()"
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
              <span class="block capitalize">
                {{ user.name || "No name" }}
              </span>
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
                  @click.prevent="deleteUser.open(user.id)"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="add-user" v-if="addUser.data.status">
      <CompositeModalFullPage @click-outside="addUser.close()">
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
                  v-model="addUser.data.data.name"
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
                  v-model="addUser.data.data.email"
                />
              </div>
              <div class="input-group">
                <label class="block text-neutral-700 mb-2" for="email"
                  >Password</label
                >
                <input
                  class="w-full border border-orange-400 rounded p-1"
                  type="password"
                  v-model="addUser.data.data.password"
                />
              </div>
              <div class="status">
                <div
                  :class="[
                    'rounded p-2 px-4',
                    addUser.data.status === 'failed'
                      ? 'bg-red-300'
                      : 'bg-green-300',
                  ]"
                  v-if="
                    ['failed', 'success'].includes(addUser.data.status!)
                  "
                >
                  {{ addUser.data.message }}
                </div>
              </div>
              <div class="add-user-action flex justify-end gap-2">
                <button
                  :class="[
                    'border p-1 px-3 rounded',
                    addUser.data.status != 'waiting'
                      ? 'bg-red-300 hover:bg-red-400 border-red-500'
                      : 'bg-neutral-400 pointer-events-none',
                  ]"
                  @click.prevent="() => addUser.close()"
                >
                  cancel
                </button>
                <button
                  :class="[
                    'border p-1 px-3 rounded',
                    addUser.data.status != 'waiting'
                      ? 'bg-orange-300 hover:bg-orange-400 border-orange-500'
                      : 'bg-neutral-400 pointer-events-none',
                  ]"
                  @click.prevent="addUser.exec()"
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      </CompositeModalFullPage>
    </div>
    <div class="user-action-modal">
      <div class="delete-user" v-if="deleteUser.data.status">
        <CompositeModalFullPage @click-outside="deleteUser.close()">
          <div class="min-w-[320px]">
            <div class="div">
              <div class="mb-2">
                <h3 class="text-lg font-bold text-center">Delete user</h3>
              </div>
              <div class="flex flex-col gap-4">
                <div class="">
                  <span class="block mb-2">Are you sure to delete user ?</span>
                  <div
                    class="user-information border border-blue-400 rounded p-2"
                  >
                    <span class="text-red-500 font-semibold border-b">
                      User Information
                    </span>
                    <div>
                      <span class="inline-block w-[48px]">Name</span>
                      <span class="capitalize"
                        >: {{ deleteUser.data.data.name }}</span
                      >
                    </div>
                    <div>
                      <span class="inline-block w-[48px]">Email</span>
                      <span>: {{ deleteUser.data.data.email }}</span>
                    </div>
                  </div>
                </div>
                <div class="status">
                  <div
                    :class="[
                      'rounded p-2 px-4',
                      deleteUser.data.status === 'failed'
                        ? 'bg-red-300'
                        : 'bg-green-300',
                    ]"
                    v-if="
                      ['failed', 'success'].includes(deleteUser.data.status)
                    "
                  >
                    {{ deleteUser.data.message }}
                  </div>
                </div>
                <div class="add-user-action flex justify-end gap-2">
                  <button
                    :class="[
                      'border p-1 px-3 rounded',
                      deleteUser.data.status != 'waiting'
                        ? 'bg-red-300 hover:bg-red-400 border-red-500'
                        : 'bg-neutral-400 pointer-events-none',
                    ]"
                    @click.prevent="deleteUser.close()"
                  >
                    cancel
                  </button>
                  <button
                    :class="[
                      'border p-1 px-3 rounded',
                      deleteUser.data.status != 'waiting'
                        ? 'bg-orange-300 hover:bg-orange-400 border-orange-500'
                        : 'bg-neutral-400 pointer-events-none',
                    ]"
                    @click.prevent="deleteUser.exec()"
                  >
                    Delete User
                  </button>
                </div>
              </div>
            </div>
          </div>
        </CompositeModalFullPage>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: usersData } = await useFetch("/api/v1.0/users");

const addUser: {
  data: {
    data: { name?: string; email?: string; password?: string };
    status?: "bind" | "waiting" | "failed" | "success";
    message?: string;
  };
  open: () => void;
  close: () => void;
  exec: () => void;
} = reactive({
  data: { data: {} },

  open: () => {
    addUser.data.status = "bind";
  },

  close: () => {
    addUser.data = {
      data: {},
    };
  },

  exec: async () => {
    addUser.data.status = "waiting";
    const { data: addUserResult } = await useFetch("/api/v1.0/users", {
      method: "post",
      body: addUser.data.data,
    });

    if (addUserResult.value) {
      addUser.data.status = addUserResult.value.data.user
        ? "success"
        : "failed";
      addUser.data = {
        ...addUser.data,
        data: addUser.data.data,
        message: addUserResult.value.message,
      };
    }

    setTimeout(async () => {
      if (addUser.data.status === "success") {
        await useFetch("/api/v1.0/users").then((_usersData) => {
          usersData.value = _usersData.data.value;
        });
        addUser.data = {
          data: {},
        };
      }
    }, 3000);
  },
});

const deleteUser: {
  data: {
    data: { id?: string; name?: string; email?: string };
    status?: "bind" | "waiting" | "failed" | "success";
    message?: string;
  };
  open: (id: string) => void;
  close: () => void;
  exec: () => void;
} = reactive({
  data: { data: {} },

  open: (id: string) => {
    const selectedUserToDelete = usersData.value?.data.users?.find(
      (user) => user.id == id
    );
    if (selectedUserToDelete) {
      deleteUser.data.data = selectedUserToDelete as any;
      deleteUser.data.status = "bind";
    }
  },

  close: () => {
    deleteUser.data = { data: {} };
  },

  exec: async () => {
    deleteUser.data.status = "waiting";
    const { data: deleteUserResult } = await useFetch("/api/v1.0/users", {
      method: "delete",
      body: { id: deleteUser.data.data.id },
    });

    if (deleteUserResult.value) {
      deleteUser.data.status = deleteUserResult.value.data.user
        ? "success"
        : "failed";
      deleteUser.data = {
        ...deleteUser.data,
        data: deleteUser.data.data,
        message: deleteUserResult.value.message,
      };
    }

    setTimeout(async () => {
      if (deleteUser.data.status === "success") {
        await useFetch("/api/v1.0/users").then((_usersData) => {
          usersData.value = _usersData.data.value;
        });
        deleteUser.data = {
          data: {},
        };
      }
    }, 3000);
  },
});
</script>

<style scoped></style>
