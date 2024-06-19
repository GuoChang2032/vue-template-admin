import { createDiscreteApi, NIcon as naiveIcon } from "naive-ui";
import router from "../router";
import { useUserInfo } from "@/stores/user";
import { msgType } from "../types/types";
import type { Component } from "vue";

const LOCAL_NAME = "localStorageName";
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

export const getUserInfo = () => {
  const d = localStorage.getItem(LOCAL_NAME);
  if (!d) return;
  return JSON.parse(fromCode(d));
};
export const setUserInfo = (data: any): void => {
  const str = toCode(JSON.stringify(data));
  localStorage.setItem(LOCAL_NAME, str);
};

export const logout = () => {
  router.push({ path: "/login", replace: true });
  localStorage.removeItem("user_login_info");
};

export const Message = (type: msgType, msg: string) => {
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

// 获取登录信息
export const userInfoAbout = (type: string): any => {
  const uui = useUserInfo();
  let info = uui.getInfo;
  if (!uui) return;
  const token = info.access_token;
  const user_info = info.user_info;
  if (type === "info") {
    return user_info && user_info;
  } else if (type === "token") {
    return token;
  }
};

export const renderIcon = (icon: Component) => {
  return () => {
    return h(
      naiveIcon,
      {},
      {
        default: () => h(icon),
      }
    );
  };
};
