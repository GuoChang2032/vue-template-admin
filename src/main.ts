import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/permission.js";
import 'element-plus/theme-chalk/dark/css-vars.css'

// 自定义全局css
// import "./assets/style/main.less";
import "nprogress/nprogress.css";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "element-plus/es/components/message/style/css";
import "@purge-icons/generated";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './index.css'

const app = createApp(App);
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(pinia);
app.use(router).mount("#app");
