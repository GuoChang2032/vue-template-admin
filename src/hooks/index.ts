// 逻辑复用文件

import http from "@/service/http";
import { useUserInfo } from "@/stores/user";
import { fetchReturnType, ResType } from "@/types/types";
import { Message } from "@/utils/utils";
import router from "@/router";


/**
 * 简单请求函数
 */
export function useFetch(
  url: string,
  params?: {},
  method: string = "get"
): Promise<fetchReturnType> {
  const data = ref<ResType | null>();
  const error = ref<string>();

  return new Promise((resolve) => {
    http
      .action(method, url, params)
      .then((res: ResType) => {
        if (res.success) {
          data.value = res;
        } else {
          error.value = res.message;
        }
      })
      .catch((err) => {
        error.value = err;
      })
      .finally(() => {
        resolve({ data, error });
      });
  });
}

/**
 * 退出登录通用函数
 */
export function useLogout() {
  http
    .get("sys/logout")
    .then((res) => {
      if (res.success) {
        const info = useUserInfo();
        info.clearUserInfo();
        Message("success", "退出登录成功");
      }
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      router.push("/login");
    });
}
