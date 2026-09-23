import type { RouteRecordRaw } from "vue-router";

import { AboutPage } from "@/pages/about";
import { MainPage } from "@/pages/main";

/**
 * 应用路由表
 */
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "main",
    component: MainPage,
  },
  {
    path: "/about",
    name: "about",
    component: AboutPage,
  },
];

export default routes;
