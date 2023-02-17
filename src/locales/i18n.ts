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
      system: "System manage",
      userManage: "User manage",
      routeManage: "Routing manage",
    },
    header: {
      title: "The best system in the world",
      desc: "It is the most influential code-free platform in the universe! Brain-computer link, zero code to achieve 100% function~fully automatic code generation, no manual work, real dream, omnipotent, let you one project a day",
    },
    form: {
      placeholder: {
        name: "Enter name",
        date: "Select date",
        course: "Select course",
      },
      login: {
        title: "Login",
        account: "Enter account",
        password: "Enter password",
        forgot: "Forgot password?",
        remember: "Remember me",
        code: "Enter code",
        register: "Register",
        otherLogin: "Other login methods",
        phoneLogin: "Phone login",
        codeLogin: "QR code login",
        faceLogin: "Face login",
        phone: "Enter phone number",
        return: "Return",
        sendCode: "Send verification code",
        resendCode: " seconds resend later",
        wechatQR: "Use wechat to scan the code to log in",
        notSupport: "Not supported yet",
        rightPhone: "Please enter the correct phone number",
      },
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
      system: "系统管理",
      userManage: "用户管理",
      routeManage: "路由管理",
    },
    header: {
      title: "世界第一低代码平台",
      desc: "是全宇宙最具影响力的 无代码平台！脑机链接，零代码实现100%的功能~ 全自动生成代码，无需人工，真正的心想事成，无所不能,让你一天一个项目",
    },
    form: {
      placeholder: {
        name: "输入名称",
        date: "选择日期",
        course: "选择课程",
      },
      login: {
        title: "登录",
        account: "输入账号",
        password: "输入密码",
        forgot: "忘记密码?",
        remember: "记住我",
        code: "输入验证码",
        register: "注册",
        otherLogin: "其他登录方式",
        phoneLogin: "手机号登录",
        codeLogin: "二维码登录",
        faceLogin: "人脸识别登录",
        phone: "输入手机号",
        return: "返回",
        sendCode: "发送验证码",
        resendCode: " 秒后重发",
        wechatQR: "使用微信扫码即可登录",
        notSupport: "暂未支持",
        rightPhone: "请输入正确的手机号",
      },
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
