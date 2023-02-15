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
    header: {
      title: "The best system in the world",
      desc: "It is the most influential code-free platform in the universe! Brain-computer link, zero code to achieve 100% function~fully automatic code generation, no manual work, real dream, omnipotent, let you one project a day",
    },
    form:{
      placeholder:{
        name:'Enter name',
        date:'Select date',
        course:'Select course'
      },
      login:{
        title:'Login',
        account:'Enter account',
        password:'Enter password',
        forgot:'Forgot password',
        remember:'Remember me',
        register:'Register',
        otherLogin:'Other login methods',
        phoneLogin:'Phone login',
        codeLogin:'QR code login',
        faceLogin:'Face login'
      }
    },
    logout: "logout",
  },
  zh: {
    message: {
      warn: "警告",
    },
    page: {
      index: "首页",
      dashboard: "仪表盘",
    },
    header: {
      title: "世界第一低X平台",
      desc: "是全宇宙最具影响力的 无代码平台！脑机链接，零代码实现100%的功能~ 全自动生成代码，无需人工，真正的心想事成，无所不能,让你一天一个项目",
    },
    form:{
      placeholder:{
        name:'输入名称',
        date:'选择日期',
        course:'选择课程'
      }
    },
    logout: "注销",
  },
};
const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: local,
  messages,
});

export default i18n;
