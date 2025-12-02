import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  hooks: {
    "prerender:routes"({ routes }) {
      routes.clear(); // Do not generate any routes (except the defaults)
    },
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@ant-design-vue/nuxt",
    "dayjs-nuxt",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "nuxt-vuefire",
  ],

  vuefire: {
    auth: {
      enabled: true,
    },
    emulators: false,
    config: {
      apiKey: "AIzaSyBzFLkmXaiqZa--l0l2ymUCdA191jXp5TI",
      authDomain: "mivivienda-c6b6f.firebaseapp.com",
      projectId: "mivivienda-c6b6f",
      storageBucket: "mivivienda-c6b6f.firebasestorage.app",
      messagingSenderId: "207686775806",
      appId: "1:207686775806:web:7a5e7778beb894fef106af",
      measurementId: "G-XF9W83XCZX",
    },
  },

  pinia: {
    storesDirs: ["./stores/**"],
  },
  dayjs: {
    locales: ["en", "es"],
    plugins: ["relativeTime", "utc", "timezone", "isBetween"],
    defaultLocale: "es",
    defaultTimezone: "America/Lima",
  },
  css: ["ant-design-vue/dist/reset.css", "~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "ant-design-vue/dist": "ant-design-vue/dist",
        "ant-design-vue/es": "ant-design-vue/es",
        "ant-design-vue/lib": "ant-design-vue/es",
        "ant-design-vue": "ant-design-vue/es",
      },
    },
  },
});
