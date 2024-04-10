import { defineStore } from "pinia";
import { UserLoginInfoType } from "@/utils/types";
// 记录用户信息
export const useUserInfo = defineStore("user", {
  state: () => {
    return {
      info: {
        role: "",
        token: "",
      },
    };
  },
  getters: {
    getInfo(): UserLoginInfoType {
      return this.info;
    },
  },
  actions: {
    setUserInfo(res: UserLoginInfoType) {
      this.info = res;
    },
  },
  // 持久化存储
  persist: true,
});
