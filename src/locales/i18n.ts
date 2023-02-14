import { createI18n } from "vue-i18n";
let local = "zh";
const messages = {
  en: {
    message: {
      warn: "warning",
    },
    page: {
      index: "Index",
      dashboard: "Dashboard",
    },
  },
  zh: {
    message: {
      warn: "警告",
    },
    page: {
      index: "首页",
      dashboard: "仪表盘",
    },
  },
};
const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: local,
  messages,
});

export default i18n;
