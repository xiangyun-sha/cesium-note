import { createApp } from "vue";

import App from "./App.vue";
import { router } from "./routers";

import "@/shared/styles/root.css";
import "cesium/Source/Widgets/widgets.css";

// 设置 Cesium 静态资源基础路径（必须在任何 Cesium 资源请求前执行）。
// dev 模式下 Vite 的 define 不会作用于 optimizeDeps 预构建的 cesium.js，
// Cesium 的 buildModuleUrl 会优先读取该全局变量；若不设置，它将回退到
// import.meta.url（即 /node_modules/.vite/deps/）导致静态资源 404。
(window as unknown as { CESIUM_BASE_URL: string }).CESIUM_BASE_URL =
  "/cesiumStatic";

// 本项目不使用 Cesium ion，底图由本地静态资源提供，因此无需配置任何 Token。

const app = createApp(App);
app.use(router);
app.mount("#app");
