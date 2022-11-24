import { defineStore } from "pinia";

export const useIndex = defineStore("index", {
  state: () => {
    return {
      inverted: false,
    };
  },
  getters: {
    getInverted(): boolean {
      return this.inverted;
    },
  },
  actions: {
    setInverted() {
      this.inverted = !this.inverted;
    },
  },
  persist: true,
});
