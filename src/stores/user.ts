import { LoginResponse, UserInfo } from "@/types/types";
import { defineStore } from "pinia";

export const useUserInfo = defineStore("user", {
  state: () => {
    return {
      token: "" as string,
      info: {} as UserInfo,
    };
  },
  getters: {
    getInfo(state): UserInfo {
      return state.info;
    },
    getToken(state): string {
      return state.token;
    },
    isLoggedIn(state): boolean {
      return !!state.token;
    }
  },
  actions: {
    setUserInfo(res: LoginResponse) {
      this.token = res.token;
      this.info = res.userInfo;
    },
    clearUserInfo() {
      this.token = "";
      this.info = {} as UserInfo;
    },
    updateUserInfo(partial: Partial<UserInfo>) {
      this.info = { ...this.info, ...partial };
    }
  },
  persist: true,
});
