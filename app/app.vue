<script setup lang="ts">
import { useCurrentUser } from "vuefire";

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - MiVivienda` : "MiVivienda";
  },
});

const router = useRouter();
const route = useRoute();
const user = useCurrentUser();

// const countersStore = useCountersStore()
// await callOnce(countersStore.exists)

onMounted(() => {
  watch(user, (user, _prevUser) => {
    // if (prevUser && !user) {
    //   // user logged out
    //   router.push('/login')
    // } else if (user && typeof route.query.redirect === 'string') {
    //   // user logged in
    //   router.push(route.query.redirect)
    // } else if (user) router.push({ path: '/' })

    if (user && typeof route.query.redirect === "string") {
      router.push(route.query.redirect);
    } else if (user) router.push({ path: "/" });
  });
});
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtErrorBoundary>
        <template #error="{ error }">
          <p>An error occurred: {{ error }}</p>
        </template>
      </NuxtErrorBoundary>
      <!-- <a-extract-style>
        <NuxtPage />
      </a-extract-style> -->
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style lang="css">
/* .ant-card .ant-card-head {
  @apply bg-sky-800 text-white;
} */
</style>
