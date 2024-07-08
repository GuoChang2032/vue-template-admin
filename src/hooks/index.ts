import http from "@/service/http";
import { fetchReturnType } from "@/types/types";

export function useFetch(
  url: string,
  params?: {},
  method: string = "get"
): Promise<fetchReturnType> {
  const data = ref<any>(null);
  const error = ref<any>(null);

  return new Promise((resolve) => {
    http
      .action(method, url, params)
      .then((res: any) => {
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

export function useLogout() {
  http
    .get("cl/sys/logout")
    .then((res) => {
      if (res.success) {
        // const info = useUserInfo();
        // info.setUserInfo({});
        // Message("success", "退出登录成功");
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
