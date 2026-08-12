import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { viteStaticCopy } from "vite-plugin-static-copy";

// 定义Cesium源码路径和静态资源目标路径
const cesiumSource = "node_modules/cesium/Build/Cesium";
// cesiumBaseUrl 是静态资源在构建目录中的目标文件夹名，可自定义
const cesiumBaseUrl = "cesiumStatic";
// vite-plugin-static-copy 会把 src 的完整相对目录结构（相对于项目根）保留在 URL 中，
// 即默认会被提供到 `/cesiumStatic/node_modules/cesium/Build/Cesium/...`。
// 因此剥离掉 `cesiumSource` 的目录段数（node_modules/cesium/Build/Cesium = 4 段），
// 使 remaining 子路径（Workers/Assets/Widgets/ThirdParty/...）直接挂到 dest 下，
// 从而正确提供在 `/cesiumStatic/Assets/...`、`/cesiumStatic/Workers/...` 等路径。
const stripBase = cesiumSource.split("/").length;

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    viteStaticCopy({
      targets: [
        {
          src: `${cesiumSource}/Workers/**/*`,
          dest: cesiumBaseUrl,
          rename: { stripBase },
        },
        {
          src: `${cesiumSource}/Assets/**/*`,
          dest: cesiumBaseUrl,
          rename: { stripBase },
        },
        {
          src: `${cesiumSource}/Widgets/**/*`,
          dest: cesiumBaseUrl,
          rename: { stripBase },
        },
        {
          src: `${cesiumSource}/ThirdParty/**/*`,
          dest: cesiumBaseUrl,
          rename: { stripBase },
        },
      ],
    }),
  ],

  define: {
    // 关键：告诉Cesium从哪个路径加载静态资源
    CESIUM_BASE_URL: JSON.stringify(`/${cesiumBaseUrl}`),
  },

  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },

  server: {
    port: 3050,
  },
});
