import { defineStore } from "pinia";

export const useUserInfo = defineStore("user", {
  state: () => {
    return {
      info: {},
    };
  },
  getters: {
    getInfo(): any {
      return this.info;
    },
  },
  actions: {
    setUserInfo(res: any) {
      this.info = res;
    },
  },
  persist: true,
});
