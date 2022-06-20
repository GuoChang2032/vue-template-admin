//http.ts
import axios, { AxiosRequestConfig } from "axios";
import { Message } from "@/utils/tool.js";
import { start, done } from "@/utils/nprogress.js";
import { logout } from "@/utils/hooks.js";
import { ResType } from "@/utils/types";
import { useUserInfo } from "@/stores/user";
// import {start,close} from '@/utils/nprogress'
// 设置请求头和请求路径

// 请求url
axios.defaults.baseURL = import.meta.env.VITE_APP_API_BASE_URL;
axios.defaults.timeout = 10000;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";

// 请求拦截
axios.interceptors.request.use(
  (config): AxiosRequestConfig<any> => {
    // 请求token或其他鉴权
    let user = useUserInfo();
    let token = user.tokens || "";
    //@ts-ignore
    if (token) {
      //@ts-ignore
      config.headers["x-access-token"] = token;
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
      logout();
    }
    return err;
  }
);

interface Http {
  get<T>(url: string, params?: unknown): Promise<ResType<T>>;
  post<T>(url: string, params?: unknown): Promise<ResType<T>>;
  delete<T>(url: string, params?: unknown): Promise<ResType<T>>;
  action<T>(type: string, url: string, params?: unknown): Promise<ResType<T>>;
  upload<T>(url: string, params: unknown): Promise<ResType<T>>;
  downFile<T>(url: string, params: unknown): Promise<T>;
  download(url: string): void;
}

const http: Http = {
  get(url, params) {
    return new Promise((resolve, reject) => {
      start();
      axios
        .get(url, { params })
        .then((res) => {
          done();
          if (!res.data.success) {
            Message("success", res.data.message);
          }
          resolve(res.data);
        })
        .catch((err) => {
          done();
          reject(err.data);
        });
    });
  },

  post(url, params) {
    return new Promise((resolve, reject) => {
      start();
      axios
        .post(url, JSON.stringify(params))
        .then((res) => {
          done();
          if (!res.data.success) {
            Message("error", res.data.message);
          }
          resolve(res.data);
        })
        .catch((err) => {
          done();
          reject(err.data);
        });
    });
  },

  delete(url, params) {
    return new Promise((resolve, reject) => {
      start();
      axios
        .delete(url, { params })
        .then((res) => {
          done();
          if (!res.data.success) {
            Message("error", res.data.message);
          }
          resolve(res.data);
        })
        .catch((err) => {
          done();
          reject(err.data);
        });
    });
  },

  action(type, url, params) {
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
          resolve(res.data);
        })
        .catch((err) => {
          done();
          reject(err.data);
        });
    });
  },

  upload(url, file) {
    return new Promise((resolve, reject) => {
      start();
      axios
        .post(url, file, {
          headers: { "Content-Type": "multipart/form-data" },
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
