// import { Message } from "@/utils/tool.js";
import { createDiscreteApi } from "naive-ui";
import router from "../router";
import i18n from "@/locales/i18n";
import { RouterLink } from "vue-router";
import { useI18n } from "vue-i18n";
import Icon from '@/components/icon.vue'
const LOCAL_NAME = "localStorageName";

function renderIcon(icon: string) {
  return () => h(Icon, {icon});
}

export const backTop = (num = 0, duration = 50): void => {
  // document.documentElement.scrollTop = num === 0 ? document.body.scrollTop : num
  // 现在的位置
  let top = document.documentElement.scrollTop || document.body.scrollTop;
  // 实现滚动效果
  const timeTop = setInterval(() => {
    // 视图位置 =
    document.documentElement.scrollTop =
      document.documentElement.scrollTop =
      top -=
        duration;
    if (num === 0) {
      if (top <= 0) {
        clearInterval(timeTop);
      }
    } else {
      if (top <= num) {
        clearInterval(timeTop);
      }
    }
  }, 10);
};

// 加密
export const toCode = (str: string): string => {
  const key = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const st = key.length;
  const a = key.split("");
  let s = "",
    b,
    b1,
    b2,
    b3;
  for (let i = 0; i < str.length; i++) {
    b = str.charCodeAt(i);
    b1 = b % st;
    b = (b - b1) / st;
    b2 = b % st;
    b = (b - b2) / st;
    b3 = b % st;
    s += a[b3] + a[b2] + a[b1];
  }
  return s;
};

// 解密
export const fromCode = (str: string): string => {
  const key = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const st = key.length;
  let b,
    b1,
    b2,
    b3,
    d = 0,
    s;
  s = new Array(Math.floor(str.length / 3));
  b = s.length; //获取数组的长度
  for (let i = 0; i < b; i++) {
    b1 = key.indexOf(str.charAt(d));
    d++;
    b2 = key.indexOf(str.charAt(d));
    d++;
    b3 = key.indexOf(str.charAt(d));
    d++;
    s[i] = b1 * st * st + b2 * st + b3;
  }
  b = eval("String.fromCharCode(" + s.join(",") + ")");
  return b;
};

// 获取用户信息
export const getUserInfo = () => {
  const d = localStorage.getItem(LOCAL_NAME);
  if (!d) return;
  return JSON.parse(fromCode(d));
};

// 设置用户信息
export const setUserInfo = (data: any): void => {
  const str = toCode(JSON.stringify(data));
  localStorage.setItem(LOCAL_NAME, str);
};

// 登出
export const logout = () => {
  router.push({ path: "/login", replace: true });
  // localStorage.removeItem("user_login_info");
  // Message("warning", "登录过期,请重新登录!");
};

// 消息
export const Message = (type: any, msg: string) => {
  const { message } = createDiscreteApi(["message"]);
  if (type === "info") {
    message.info(msg);
  } else if (type === "warning") {
    message.warning(msg);
  } else if (type === "error") {
    message.error(msg);
  } else if (type === "success") {
    message.success(msg);
  }
};

// 判断该页面的分页是否需要记忆
export const judgePage = (r_page: any, route: string): boolean => {
  if (!r_page.getPage.reset && r_page.getPage.route === route) return true;
  return false;
};

export const setMenuData = () => {
  const { t } = useI18n();
  let m = [
    {
      label: () => {
        return t("page.dashboard");
      },
      children: [
        {
          label: () =>
            h(
              RouterLink,
              {
                to: {
                  name: "index",
                },
              },
              { default: () => t("page.index") }
            ),
          key: "homepage",
        },
      ],
      key: "index",
      icon: renderIcon('material-symbols:dashboard-outline'),
    },
    {
      label: () => {
        return t("page.system");
      },
      icon: renderIcon('material-symbols:blind'),
      key: "userManage",
      children: [
        {
          label: () =>
            h(
              RouterLink,
              {
                to: {
                  name: "userManage",
                },
              },
              { default: () => t("page.userManage") }
            ),
          key: "userManage",
        },
        {
          label: () =>
            h(
              RouterLink,
              {
                to: {
                  name: "routeManage",
                },
              },
              { default: () => t("page.routeManage") }
            ),
          key: "routeManage",
        },
      ],
    },
  ];
  return m;
};

export function routerNameMapping(router:string){
  let a:any = {
    statistics:'page.statistics',
    routeManage:'page.routeManage',
    userManage:'page.userManage',
    homepage:'page.index',
  }
  return a[router] || 'page.index'
} 

