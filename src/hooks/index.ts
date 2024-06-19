// 逻辑复用文件

import http from "@/service/http";
import { fetchReturnType } from "@/types/types";

export function useFetch(url: string): Promise<fetchReturnType> {
  const data = ref<any>(null);
  const error = ref<any>(null);

  return new Promise((resolve) => {
    http
      .get(url)
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
