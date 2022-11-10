import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import IndexLayout from "@/layouts/IndexLayout.vue";
import userCenterLayout from "@/layouts/userCenterLayout.vue";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "index",
    component: IndexLayout,
    children: [
      {
        path: "/",
        name: "index",
        meta: {
          title: "首页",
        },
        component: () => import("@/views/index.vue"),
      },
      {
        path: "/charts",
        name: "Charts",
        meta: {
          title: "图表",
        },
        component: () => import("@/views/charts/charts.vue"),
      },
    ],
  },
  {
    path: "/us",
    redirect: "usercenter",
    component: userCenterLayout,
    children: [
      {
        path: "/usercenter",
        name: "usercenter",
        meta: {
          title: "课程中心",
        },
        component: () => import("@/views/listPage/list.vue"),
      },
    ],
  },

  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录",
    },
    component: () => import("@/views/login/userLogin.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
