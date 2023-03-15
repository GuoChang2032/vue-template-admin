import { defineStore } from "pinia";

export const useMenus = defineStore("menus", {
  state: () => {
    return {
      menusData: [
        {
            name:''
        }
      ],
    };
  },
  getters: {
    getMenus(): any {
      return this.menusData;
    },
  },
  actions: {
    setMenus(data: any) {
      this.menusData = data;
    },
  },
  persist: true,
});
