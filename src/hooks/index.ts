// 逻辑复用文件

import http from "@/service/http";
import { fetchReturnType, ResType } from "@/types/types";

export function useFetch(
  url: string,
  params?: {},
  method: string = "get"
): Promise<fetchReturnType> {
  const data = ref<ResType|null>();
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
