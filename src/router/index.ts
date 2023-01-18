import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import IndexLayout from "@/layouts/IndexLayout.vue";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "index",
    component: IndexLayout,
    children: [
      {
        path: "/index", 
        name: "index",
        meta: {
          title: "首页",
        },
        component: () => import("@/views/listPage/list.vue"),
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
        path: "/userMan",
        name: "userMan",
        meta: {
          title: "用户管理",
        },
        component: () => import("@/views/userMan.vue"),
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
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: "smooth" };
    }
  },
});

export default router;
