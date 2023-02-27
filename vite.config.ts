import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import {
  ElementPlusResolver,
  NaiveUiResolver,
} from "unplugin-vue-components/resolvers";
import PurgeIcons from "vite-plugin-purge-icons";
import commpressPlugin from "vite-plugin-compression";
import OptimizationPersist from "vite-plugin-optimize-persist";
import PkgConfig from "vite-plugin-package-config";
const path = require("path");

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver(), NaiveUiResolver()],
      imports: ["vue",'vue-i18n','vue-router'],
      dts: "src/auto-import.d.ts",
    }),
    Components({
      resolvers: [ElementPlusResolver(), NaiveUiResolver()],
    }),
    PurgeIcons({
      /* PurgeIcons Options */
    }),
    commpressPlugin({
      verbose: true, // 默认即可
      disable: false, //开启压缩(不禁用)，默认即可
      deleteOriginFile: false, //删除源文件
      threshold: 10240, //压缩前最小文件大小
      algorithm: "gzip", //压缩算法
      ext: ".gz", //文件类型
    }),
    PkgConfig(),
    OptimizationPersist(),
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
    port: 9999,
    // proxy: {
    //   "/": {
    //     target: "https://c.elanginfo.com/elang-math",
    //     ws: true,
    //   },
    // },
  },
  esbuild: {
    pure: ["console.log", "console.info"],
    minify: true,
  },
});
