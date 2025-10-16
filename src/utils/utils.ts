import { createDiscreteApi, NIcon as naiveIcon } from "naive-ui";
import router from "../router";
import { useUserInfo } from "@/stores/user";
import { msgType } from "../types/types";
import type { Component } from "vue";

const LOCAL_NAME = "localStorageName";

/**
 * 返回页面顶部的函数
 * @param num {number} - 滚动到页面顶部的距离，默认为0，表示滚动到页面的最顶部
 * @param duration {number} - 滚动回顶部所需的时间，默认为50毫秒，用于控制滚动的平滑度
 * @returns {void}
 */
export const backTop = (num = 0, duration = 50): void => {
  let top = document.documentElement.scrollTop || document.body.scrollTop;
  const timeTop = setInterval(() => {
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

/**
 *
 * @param str {string} - 需要进行编码的字符串
 * @returns
 */
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

const { message } = createDiscreteApi(["message"]);

// 消息提示弹窗
export const Message = (type: msgType, msg: string) => {
  const typeMap: Record<msgType, (msg: string) => void> = {
    info: message.info,
    warning: message.warning,
    error: message.error,
    success: message.success,
  };

  typeMap[type]?.(msg);
};

// 获取登录信息
export const userInfoAbout = (type: string): any => {
  const uui = useUserInfo();
  const token = uui.getToken;
  const user_info = uui.getInfo;
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

// 通过递归实现深拷贝
export const deepClone = (obj: any): any => {
  // 空或者简单类型，直接返回该值
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  // 初始化赋值，判断是数组还是对象
  const copy: any = Array.isArray(obj) ? [] : {};
  // 循环值
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepClone(obj[key]);
    }
  }
  return copy;
};

/**
 * 校验表单必填项
 * @param form 表单对象
 * @param rules 字段校验提示信息（key 对应字段，value 为提示）
 * @returns 是否有未填写项
 */
export const judgeUserForm = (
  form: Record<string, any>,
  rules: Record<string, string>
): boolean => {
  for (const k in rules) {
    if (!form[k]) {
      Message("warning", rules[k]);
      return true; // 一旦发现未填写就返回
    }
  }
  return false;
};

// 判断资源前缀，追加完整路径
export function ensureHttpPrefix(
  url: string,
  prefix: string = import.meta.env.VITE_APP_API_BASE_URL
) {
  if (!url) return "";

  // 检查是否已有 http:// 或 https:// 前缀
  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  return prefix + url;
}

// 下载某个链接地址的资源
export async function downloadUrl(path:string) {
  const response = await fetch(path);
  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `xxxx`;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
