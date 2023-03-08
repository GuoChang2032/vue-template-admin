import { defineStore } from "pinia";

export const useIndex = defineStore("index", {
  state: () => {
    return {
      inverted: false,
      activeKey:'index'
    };
  },
  getters: {
    getInverted(): boolean {
      return this.inverted;
    },
    getActiveKey():string{
      return this.activeKey
    }
  },
  actions: {
    setInverted() {
      this.inverted = !this.inverted;
    },
    setActiveKey(key:string){
      this.activeKey = key
    }
  },
  persist: true,
});
