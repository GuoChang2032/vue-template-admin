import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import PurgeIcons from "vite-plugin-purge-icons";
const path = require("path");

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    PurgeIcons({
      /* PurgeIcons Options */
    }),
  ],
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "./src/assets/style/main.less";',
      },
    },
  },
  // 在vue3中,需要配置@,去代表src下面的路径
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3001,
    // proxy: {
    //   "/": {
    //     target: "https://c.elanginfo.com/elang-math",
    //     ws: true,
    //   },
    // },
  },
});
