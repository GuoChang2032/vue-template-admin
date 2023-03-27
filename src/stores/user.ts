import { defineStore } from "pinia";

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

// 用于分页记忆页码
export const usePage = defineStore("pagination", {
  state: () => {
    return {
      pageObj: {
        reset: true,
        page: 1,
        route: "",
      },
    };
  },
  getters: {
    getPage(state) {
      return state.pageObj;
    },
  },
  actions: {
    setPage(page: number, route: string, isReset: boolean = false) {
      this.pageObj = {
        page,
        reset: isReset,
        route,
      };
    },
  },
});
