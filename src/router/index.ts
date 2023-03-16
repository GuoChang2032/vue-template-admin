import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import IndexLayout from "@/layouts/IndexLayout.vue";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "index",
    name: "home",
    component: IndexLayout,
    children: [
      {
        path: "/index",
        name: "index",
        meta: {
          title: "首页",
        },
        component: () => import("@/views/statistics/statistics.vue"),
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          title: "dashboard",
        },
        component: () => import("@/views/dashboard/dashboard.vue"),
      },
      {
        path: "/userManage",
        name: "userManage",
        meta: {
          title: "用户管理",
        },
        component: () => import("@/views/sys/userManage.vue"),
      },
      {
        path: "/routeManage",
        name: "routeManage",
        meta: {
          title: "路由管理",
        },
        component: () => import("@/views/sys/menuManage.vue"),
      },
      
      {
        path: "/chat",
        name: "chat",
        meta: {
          title: "ChatGPT",
        },
        component: () => import("@/views/chat/chat.vue"),
      },
      {
        path: "/stats",
        name: "stats",
        meta: {
          title: "统计",
        },
        component: () => import("@/views/sys/menuManage.vue"),
      },
    ],
  },

  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录",
    },
    // component: () => import("@/views/login/userLogin.vue"),
    component: () => import("@/views/login/login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition;
  //   } else {
  //     return { top: 0, behavior: "smooth" };
  //   }
  // },
});

export default router;
