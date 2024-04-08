import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import IndexLayout from "@/layouts/IndexLayout.vue";

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
    path: "/login",
    name: "Login",
    meta: {
      title: "登录",
    },
    component: () => import("@/views/login/userLogin.vue"),
  },
  {
    path: "/403",
    name: "403",
    meta: {
      key: "exception",
    },
    component: () => import("@/views/abnormal/403.vue"),
  },
  {
    path: "/:path(.*)",
    name: "404",
    meta: {
      key: "exception",
    },
    component: () => import("@/views/abnormal/404.vue"),
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
