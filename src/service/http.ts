// 复用api集合

import axios, { AxiosRequestConfig } from "axios";
import { Message, userInfoAbout } from "@/utils/utils";
import { start, done } from "@/utils/nprogress.js";
import { ApiReturnType, UserLoginInfoType } from "@/types/types";
import { useUserInfo } from "@/stores/user";

// 设置请求头和请求路径
axios.defaults.baseURL = import.meta.env.VITE_APP_API_BASE_URL;
axios.defaults.timeout = 30000;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";

// 请求拦截
axios.interceptors.request.use(
  (config): any => {
    // 请求token或其他鉴权
    let t: string = userInfoAbout("token");
    if (t && config.headers) {
      config.headers["x-access-token"] = t;
    }
    return config;
  },
  (error) => {
    return error;
  }
);

// 响应拦截
axios.interceptors.response.use(
  (res) => {
    return res;
  },
  // 错误拦截
  (err) => {
    // 登录过期
    if (
      err.response.data.status === 500 &&
      err.response.data.message.includes("Token")
    ) {
      // logout();
    }
    return err;
  }
);

interface Http {
  get<T = ApiReturnType>(url: string, params?: unknown): Promise<T>;
  post<T = ApiReturnType>(url: string, params?: unknown): Promise<T>;
  delete<T = ApiReturnType>(url: string, params?: unknown): Promise<T>;
  action<T = ApiReturnType>(
    type: string,
    url: string,
    params?: unknown
  ): Promise<T>;
  upload<T>(url: string, params: unknown): Promise<T>;
  downFile<T>(url: string, params: unknown): Promise<T>;
  download(url: string): void;
}
type method = "get" | "post" | "delete" | "patch" | "put";

const http: Http = {
  get<T>(url: string, params?: unknown): Promise<T> {
    return this.action("get", url, params);
  },

  post<T>(url: string, params?: unknown): Promise<T> {
    return this.action("post", url, params);
  },

  delete<T>(url: string, params?: unknown): Promise<T> {
    return this.action("delete", url, params);
  },

  action<T>(type: method, url: string, params?: unknown): Promise<T> {
    return new Promise((resolve, reject) => {
      start();
      axios({
        method: type,
        url,
        data: params,
      })
        .then((res) => {
          done();
          if (!res.data.success) {
            Message("error", res.data.message);
          }
          const d: T = res.data;
          resolve(d);
        })
        .catch((err) => {
          done();
          reject(err.data);
        });
    });
  },

  upload<T>(url: string, file: any): Promise<T> {
    return new Promise((resolve, reject) => {
      start();
      axios
        .post(url, file, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          done();
          const d: T = res.data;
          resolve(d);
        })
        .catch((err) => {
          done();
          reject(err.data);
        });
    });
  },

  // 下载,文件导出
  downFile(url, parameter) {
    return new Promise((resolve, reject) => {
      start();
      axios({
        url: url,
        params: parameter,
        method: "get",
        responseType: "blob",
      })
        .then((res) => {
          done();
          resolve(res.data);
        })
        .catch((err) => {
          done();
          reject(err.data);
        });
    });
  },

  download(url) {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = url;
    iframe.onload = function () {
      document.body.removeChild(iframe);
    };
    document.body.appendChild(iframe);
  },
};
export default http;
