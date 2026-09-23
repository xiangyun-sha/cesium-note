import { createApp } from "vue";

import App from "./App.vue";
import { router } from "./routers";
import { ViewerSingleton } from "@/widgets/cesium-viewer";

import "@/shared/styles/root.css";
import "cesium/Source/Widgets/widgets.css";

// 设置 Cesium 静态资源基础路径（必须在任何 Cesium 资源请求前执行）。
// dev 模式下 Vite 的 define 不会作用于 optimizeDeps 预构建的 cesium.js，
// Cesium 的 buildModuleUrl 会优先读取该全局变量；若不设置，它将回退到
// import.meta.url（即 /node_modules/.vite/deps/）导致静态资源 404。
(window as unknown as { CESIUM_BASE_URL: string }).CESIUM_BASE_URL =
  "/cesiumStatic";

// 可选：通过 .env 配置 Cesium Ion 令牌，如 VITE_CESIUM_ION_TOKEN=你的token
const ionToken = import.meta.env.VITE_CESIUM_ION_TOKEN;
console.log(ionToken);
if (ionToken) {
  ViewerSingleton.setAccessToken(ionToken);
}

const app = createApp(App);
app.use(router);
app.mount("#app");
