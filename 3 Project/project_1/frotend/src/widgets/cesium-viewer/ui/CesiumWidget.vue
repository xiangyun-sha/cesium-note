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
import { onActivated, onDeactivated, onMounted, onUnmounted } from "vue";

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
  // KeepAlive 验证：缓存生效时此日志只打印一次（Viewer 只创建一次）
  console.log("[KeepAlive] CesiumViewer mounted");

  // 首次访问 viewer 时才真正创建 Cesium.Viewer（容器此时已挂载）
  const viewer = singleton.viewer;

  // 初始化完成后飞往中国上空（可选）
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(116.391, 39.907, 1_200_000),
    duration: 2,
  });

  // 清理版权信息
  viewer.creditDisplay.container.style.display = "none";
});

onUnmounted(() => {
  // KeepAlive 验证：缓存生效时切换路由不会触发此日志
  console.log("[KeepAlive] CesiumViewer unmounted");

  // 组件真正卸载时销毁 viewer 并重置单例
  // （KeepAlive 缓存期间切路由不会触发，只有页面被移除时才执行）
  singleton.destroy();
});

// 配合 KeepAlive：页面被缓存（切走）时暂停持续渲染，降低资源占用
onDeactivated(() => {
  console.log("[KeepAlive] CesiumViewer deactivated (暂停渲染)");

  const viewer = singleton.getViewer();
  if (!viewer) return;
  viewer.scene.requestRenderMode = true;
});

// 配合 KeepAlive：页面恢复（切回）时恢复渲染
onActivated(() => {
  console.log("[KeepAlive] CesiumViewer activated (恢复渲染)");

  const viewer = singleton.getViewer();
  if (!viewer) return;
  viewer.scene.requestRenderMode = false;
  viewer.scene.requestRender();
});
</script>

<style scoped>
.cesium-viewer,
#cesiumViewer {
  width: 100%;
  height: 100%;
}
</style>
