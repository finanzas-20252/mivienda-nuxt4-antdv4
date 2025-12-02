import { getCurrentUser } from "vuefire";

// middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to, _from) => {
  const user = await getCurrentUser();
  // redirect the user to the login page
  if (!user && to.path !== "/login") {
    return navigateTo({
      path: "/login",
      query: {
        redirect: to.fullPath,
      },
    });
  } else if (user && to.path === "/login") {
    return navigateTo({
      path: "/",
    });
  }
});
