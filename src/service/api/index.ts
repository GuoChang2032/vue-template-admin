import http from "@/service/http";
import { Message } from "@/utils/utils";
import { ApiReturnType } from "@/types/types";

type method = 'get'|'post'|'delete'|'patch'|'put'

export function request<T = ApiReturnType>(type:method,url:string,params?:unknown): Promise<T> {
  return http.action<T>(type,url,params)
}
