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