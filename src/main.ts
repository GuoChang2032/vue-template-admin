import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/permission.js";
// 全局css
import "./assets/style/main.less";
import "nprogress/nprogress.css";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "element-plus/es/components/message/style/css";
import "@purge-icons/generated";
import { createPinia } from "pinia";
const app = createApp(App);
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(createPinia());
app.use(router).mount("#app");
