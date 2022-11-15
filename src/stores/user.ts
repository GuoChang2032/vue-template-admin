import { defineStore } from "pinia";

export const useUserInfo = defineStore("user", {
  state: () => {
    return {
      info: {},
    };
  },
  getters: {
    getInfo(){
    },
  },
  actions: {
    setUserInfo(res: any) {
      this.info = res
    },
  },
  persist: true,
});
