// 逻辑复用文件

import http from "@/service/http";
import { fetchReturnType } from "@/types/types";

export function useFetch(url: string): fetchReturnType {
  const data = ref(null);
  const error = ref(null);

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
    });
  return { data, error };
}
