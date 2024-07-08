// import { Message } from "@/utils/tool.js";
import { createDiscreteApi } from "naive-ui";
import router from "../router";
import i18n from "@/locales/i18n";
import { RouterLink } from "vue-router";
import Icon from "@/components/icon.vue";
import { useMenus } from "@/stores/menu";
import { usePermission } from "@/hooks/common/business";
import { useUserInfo } from "@/stores/user";
import m from "@/utils/mitt";
import { useIndex } from "@/stores/indexStore";
import { UserLoginInfoType, MenuDataType, TabsType } from "@/types/types";

const LOCAL_NAME = "localStorageName";

export function renderIconCustom(icon: string) {
  return () => h(Icon, { icon });
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
export const setUserInfo = (data: UserLoginInfoType): void => {
  const str = toCode(JSON.stringify(data));
  localStorage.setItem(LOCAL_NAME, str);
};

// 登出
export const logout = () => {
  const us = useUserInfo();
  us.setUserInfo({ role: "", token: "" });
  router.push({ path: "/login", replace: true });
  // localStorage.removeItem("user_login_info");
  // Message("warning", "登录过期,请重新登录!");
};

// 消息
export const Message = (type: string, msg: string) => {
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
  const { t } = i18n.global;
  const { hasPermission } = usePermission();
  let ms: any = [];
  // data.forEach((item: any) => {
  //   let c: any = [];
  //   if (item.children && item.children.length > 0) {
  //     item.children.forEach((_item: any) => {
  //       c.push({
  //         label: () =>
  //           h(
  //             RouterLink,
  //             {
  //               to: {
  //                 name: _item.key,
  //               },
  //             },
  //             { default: () => _item.routeName }
  //           ),
  //         key: _item.key,
  //       });
  //     });
  //   }
  //   ms.push({
  //     label: item.routeName,
  //     key: item.key,
  //     icon: renderIconCustom(item.routeIcon),
  //     children: c,
  //   });
  // });
  ms = [
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
          key: "index",
        },
      ],
      key: "dashboard",
      icon: renderIconCustom("material-symbols:dashboard-outline"),
    },
    {
      label: () => {
        return t("page.tool");
      },
      children: [
        {
          label: () =>
            h(
              RouterLink,
              {
                to: {
                  name: "editor",
                },
              },
              { default: () => t("page.editor") }
            ),
          key: "editor",
        },
        {
          label: () =>
            h(
              RouterLink,
              {
                to: {
                  name: "chart",
                },
              },
              { default: () => t("page.chart") }
            ),
          key: "chart",
        },
      ],
      key: "tools",
      icon: renderIconCustom("mingcute:tool-line"),
    },
    {
      label: () =>
        h(
          RouterLink,
          {
            to: {
              name: "noticeCenter",
            },
          },
          { default: () => t("page.noticeCenter") }
        ),
      key: "noticeCenter",
      icon: renderIconCustom("ph:bell-ringing-light"),
    },
    {
      label: () => {
        return t("page.system");
      },
      icon: renderIconCustom("ph:gear"),
      key: "sysMan",
      show: hasPermission("sys"),
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
  return ms;
};

interface RouterNameMappingType {
  [propName: string]: string;
}

export function routerNameMapping(router: string) {
  let a: RouterNameMappingType = {
    statistics: "page.statistics",
    routeManage: "page.routeManage",
    userManage: "page.userManage",
    homepage: "page.index",
    editor: "page.editor",
    chart: "page.chart",
    noticeCenter: "page.noticeCenter",
  };
  return a[router] || "page.index";
}

export function routeMenuAdd(data: MenuDataType[], val: any) {
  // data.forEach((item: any, idx: number) => {
  //   if (item.key === val.parentMenu) {
  //     if (data[idx].children) {
  //       data[idx].children.push(val);
  //     } else {
  //       data[idx].children = [val];
  //     }
  //   }
  // });
  // return data;
}

// 判断tab菜单中是否有重复
export function judgeTab(name: string, data: TabsType[]): boolean {
  let flag: boolean = false;
  data.forEach((item: TabsType) => {
    if (item.name === name) {
      flag = true;
    }
  });
  return flag;
}

// 深拷贝
export function deepCopy(data: any) {
  if (typeof data !== "object" || data === null) {
    throw new TypeError("传入参数不是对象");
  }
  let newData: any = {};
  const dataKeys = Object.keys(data);
  dataKeys.forEach((value) => {
    const currentDataValue = data[value];
    // 基本数据类型的值和函数直接赋值拷贝
    if (typeof currentDataValue !== "object" || currentDataValue === null) {
      newData[value] = currentDataValue;
    } else if (Array.isArray(currentDataValue)) {
      // 实现数组的深拷贝
      newData[value] = [...currentDataValue];
    } else if (currentDataValue instanceof Set) {
      // 实现set数据的深拷贝
      newData[value] = new Set([...currentDataValue]);
    } else if (currentDataValue instanceof Map) {
      // 实现map数据的深拷贝
      newData[value] = new Map([...currentDataValue]);
    } else {
      // 普通对象则递归赋值
      newData[value] = deepCopy(currentDataValue);
    }
  });
  return newData;
}

export function switchTab(name: string) {
  if (!name) {
    Message("warning", "未知tab name");
    return;
  }
  const ui = useIndex();
  m.emit("pageTabChange", { val: name });
  ui.setActiveKey(name);
}

/**
 * 判断用户表单填写是否完整。
 * 该函数遍历表单对象的属性，检查是否存在未填写的必填项。
 * 如果发现未填写的项，将显示警告消息并返回true，表示表单不完整。
 * 如果所有项都已填写，则返回false，表示表单完整。
 *
 * @param f 表单对象，包含用户输入的数据。
 * @returns {boolean} 如果表单不完整返回true，否则返回false。
 */
export const judgeUserForm = (f: any): boolean => {
  let flag = false;
  const currentItem: any = {
    username: "请填写账户名",
    realname: "请填写用户名",
    phone: "请填写手机号",
    email: "请填写邮箱地址",
    avlTimeEnd: "请选择试用时间",
    avlTimeStart: "请选择试用时间",
    tenantName: "请填写机构名称",
    password: "请填写登录密码",
  };
  for (const k in f) {
    if (!f[k] && currentItem[k]) {
      Message("warning", `${currentItem[k]}`);
      flag = true;
      break;
    }
  }

  return flag;
};

/**
 * 将Base64编码的字符串转换为Blob对象。
 * Blob对象用于表示二进制大型对象，这种转换对于处理大型二进制数据非常有用，例如图片或音频文件。
 *
 * @param base64String Base64编码的字符串，通常是由图片等二进制数据转换而来的。
 * @returns 返回一个Blob对象，代表原始的二进制数据。
 */
export const base64dataToBlob = (base64String: string) => {
  const base64WithoutPrefix = base64String.replace(/^data\:.*?;base64,/, "");

  const byteCharacters = atob(base64WithoutPrefix);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const slice = byteCharacters.slice(offset, offset + 1024);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: "application/octet-stream" });
  return blob;
};
