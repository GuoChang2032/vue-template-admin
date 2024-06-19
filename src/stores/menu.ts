import { defineStore } from "pinia";
import m from "@/utils/mitt";
import { TabsType, MenuDataType } from "@/types/types";


// 菜单栏
export const useMenus = defineStore("menus", {
  state: () => {
    return {
      menusData: [
        {
          parentMenu: "layout",
          path: "/",
          routeName: "Dashboard",
          key: "dashboard",
          routeIcon: "material-symbols:dashboard-outline",
          status: 1,
          sort: 1,
          children: [
            {
              parentMenu: "dashboard",
              routeName: "首页",
              path: "/index",
              key: "index",
              routeIcon: "",
              status: 1,
              sort: 1,
            },
          ],
        },
        {
          parentMenu: "layout",
          path: "/",
          routeName: "系统管理",
          key: "sysMan",
          routeIcon: "material-symbols:blind",
          status: 1,
          sort: 2,
          children: [
            {
              parentMenu: "sysMan",
              routeName: "用户管理",
              path: "/userManage",
              key: "userManage",
              routeIcon: "",
              status: 1,
              sort: 1,
            },
            {
              parentMenu: "sysMan",
              routeName: "路由管理",
              path: "/routeManage",
              key: "routeManage",
              routeIcon: "",
              status: 1,
              sort: 1,
            },
          ],
        },
      ],
    };
  },
  getters: {
    getMenus():any {
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

// tab栏
export const useMenuTag = defineStore("tabs", {
  state: () => {
    return {
      tabs: [
        {
          fullPath: "/index",
          path: "/index",
          query: {},
          hash: "",
          name: "index",
          params: {},
          meta: {
            title: "首页",
          },
          href: "/index",
        },
      ],
    };
  },
  getters: {
    getTabs(): Array<TabsType> {
      return this.tabs;
    },
  },
  actions: {
    setTab(data: TabsType) {
      this.tabs.push(data);
    },
    removeTab(nd: Array<TabsType>) {
      this.tabs = nd;
    },
    resetTab() {
      this.tabs = [
        {
          fullPath: "/index",
          path: "/index",
          query: {},
          hash: "",
          name: "index",
          params: {},
          meta: {
            title: "首页",
          },
          href: "/index",
        },
      ];
    },
  },
  persist: true,
});
