<script setup lang="ts">
import { getAuth, signOut } from "firebase/auth";

// import Logo from '@/assets/img/logo-yacco.png'

const loading = ref(false);

const auth = getAuth();
const router = useRouter();
const user = await getCurrentUser();

const handleLogout = () => {
  Modal.confirm({
    title: "Salir?",
    onOk: () => {
      signOut(auth)
        .then(() => {
          router.go(0);
        })
        .catch((_error) => {
          // An error happened.
        });
    },
  });
};
</script>

<template>
  <a-layout-sider
    breakpoint="lg"
    collapsed-width="0"
    class="lg:sticky fixed top-0 bottom-0 left-0 h-screen z-10 lg:overflow-auto"
  >
    <div class="flex flex-col justify-between h-full pb-6">
      <div>
        <div class="h-10 m-2 py-1 flex flex-col justify-center text-center">
          <div>
            <h1 class="m-0 text-xl text-white">
              MiVivienda <sup class="text-xs">App</sup>
            </h1>
          </div>
        </div>
        <MenuNav />
      </div>

      <div class="py-5"></div>

      <div class="text-center">
        <span class="text-white"> {{ user && user.email }}</span>
        <br />
        <a-button type="link" danger @click="handleLogout">
          Cerrar sesión
        </a-button>
      </div>
    </div>
  </a-layout-sider>
</template>
