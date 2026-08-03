<template>
  <div class="cesium-viewer">
    <div id="cesiumViewer"></div>
  </div>
</template>

<script setup lang="ts">
/**
 * @BUILD_TIME 2026-08-03 14:40:35
 * @DESCRIPTION Cesium 三维地球组件（基于单例 ViewerSingleton）
 * @CREATOR xiangyun_sha
 * @MODIFIED_RECORD
 *  - TIME: 2026-08-03; AUTHOR: xiangyun_sha; DESC: 接入 ViewerSingleton 单例渲染地球;
 *  - TIME: ; AUTHOR: ; DESC:  (add more if needed);
 */

/** ==================== 外部引入 ==================== **/
import * as Cesium from "cesium";
import { onMounted, onUnmounted } from "vue";

/** ==================== 内部引入 ==================== **/
import { ViewerSingleton } from "@/widgets/cesium-viewer";

/** ==================== 类型定义 ==================== **/

/** ==================== Props / Emits ============== **/

/** ==================== 响应式变量 / 常量 =========== **/
const containerId = "cesiumViewer";

/** 获取全局唯一 Cesium 实例（懒加载，此时不会创建 Viewer） */
const singleton = ViewerSingleton.getInstance(containerId, {
  // 可在此追加自定义 Viewer 选项
});

/** ==================== 生命周期 ==================== **/
onMounted(() => {
  // 首次访问 viewer 时才真正创建 Cesium.Viewer（容器此时已挂载）
  const viewer = singleton.viewer;

  // 初始化完成后飞往中国上空（可选）
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(116.391, 39.907, 1_200_000),
    duration: 2,
  });

  // 清理 copy right
  viewer.creditDisplay.container.style.display = "none";
});

onUnmounted(() => {
  // 组件卸载时销毁 viewer 并重置单例
  singleton.destroy();
});
</script>

<style scoped>
.cesium-viewer,
#cesiumViewer {
  width: 100%;
  height: 100%;
}
</style>
