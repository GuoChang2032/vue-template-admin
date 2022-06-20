import { defineStore } from "pinia";

export const useUserInfo = defineStore("user", {
  state: () => {
    return {
      token: "",
      info: {},
    };
  },
  getters: {
    tokens: (state) => {
      return state.token;
    },
    userInfo: (state) => {
      return state.info;
    },
  },
  actions: {
    add(res: any) {
      this.token = res.result.token;
      this.info = res.result.userInfo;
      localStorage.setItem("user_login_token", res.result.token);
      localStorage.setItem("user_login_info", res.result.userInfo);
    },
    remove() {
      this.token = "";
      this.info = {};
      localStorage.removeItem("user_login_token");
      localStorage.removeItem("user_login_info");
    },
  },
});
