import { defineStore } from "pinia";
// 用于记忆分页页码或相关搜索
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
