import { createApp } from "vue";

import App from "./App.vue";
import { router } from "./routers";
import { ViewerSingleton } from "@/widgets/cesium-viewer";

import "@/shared/styles/root.css";
import "cesium/Source/Widgets/widgets.css";

// 可选：通过 .env 配置 Cesium Ion 令牌，如 VITE_CESIUM_ION_TOKEN=你的token
const ionToken = import.meta.env.VITE_CESIUM_ION_TOKEN;
if (ionToken) {
  ViewerSingleton.setAccessToken(ionToken);
}

const app = createApp(App);
app.use(router);
app.mount("#app");
