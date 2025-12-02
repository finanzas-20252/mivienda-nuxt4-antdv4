import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  important: true,
  corePlugins: {
    preflight: false,
  },
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
};
