<template>
  <div class="main-page">
    <!-- 三维地球（全屏底图） -->
    <CesiumWidget />

    <!-- 顶部工具栏：演示按需组合（props + 插槽） -->
    <HeaderWidget class="app-header" title="三维地球">
      <template #left>
        <span class="logo">🌍</span>
      </template>
      <template #right>
        <button class="tool-btn" @click="onZoomIn">放大</button>
        <button class="tool-btn" @click="onResetCamera">复位</button>
        <button class="tool-btn" @click="onGoAbout">关于</button>
      </template>
    </HeaderWidget>

    <!-- 底部状态栏 -->
    <FooterWidget />

    <!-- 左侧面板 -->
    <SliderLeftWidget />

    <!-- 右侧面板 -->
    <SliderRightWidget />
  </div>
</template>

<script setup lang="ts">
/**
 * @BUILD_TIME 2026-08-03
 * @DESCRIPTION 主页面：全屏 Cesium 三维地球 + 周边 UI 组件
 * @CREATOR xiangyun_sha
 * @MODIFIED_RECORD
 *  - TIME: 2026-08-03; AUTHOR: xiangyun_sha; DESC: Initial creation;
 *  - TIME: ; AUTHOR: ; DESC:  (add more if needed);
 */

/** ==================== 外部引入 ==================== **/
import { onMounted } from "vue";
import { useRouter } from "vue-router";

/** ==================== 内部引入 ==================== **/
import { CesiumWidget, ViewerSingleton } from "@/widgets/cesium-viewer";
import { FooterWidget } from "@/widgets/footer";
import { HeaderWidget } from "@/widgets/header";
import { SliderLeftWidget } from "@/widgets/slider-left";
import { SliderRightWidget } from "@/widgets/slider-right";

/** ==================== 组件标识 ==================== **/
/** KeepAlive 的 include 通过组件 name 匹配，必须显式声明 */
defineOptions({ name: "MainPage" });

/** ==================== 类型定义 ==================== **/

/** ==================== Props / Emits ============== **/

/** ==================== 响应式变量 / 常量 =========== **/

/** ==================== Inject（依赖注入） ========== **/

/** ==================== 组合式函数 ================== **/

/** ==================== 事件处理 ==================== **/
/** 示例：通过单例安全获取地球实例（未初始化时优雅降级） */
const onZoomIn = () => {
  const viewer = ViewerSingleton.getInstance().getViewer();
  if (!viewer) return;
  const height = viewer.camera.positionCartographic.height;
  viewer.camera.zoomIn(height * 0.3);
};

const onResetCamera = () => {
  const viewer = ViewerSingleton.getInstance().getViewer();
  if (!viewer) return;
  viewer.camera.flyHome(2);
};

/** 跳转到关于页（用于验证 KeepAlive） */
const router = useRouter();
const onGoAbout = () => router.push("/about");

/** ==================== 计算属性 ==================== **/

/** ==================== 监听器 ====================== **/

/** ==================== 生命周期 ==================== **/
onMounted(() => {
  // KeepAlive 验证：缓存生效时，切走再切回不会再次触发（仅首次进入打印一次）
  console.log("[KeepAlive] MainPage mounted");
});

/** ==================== Provide（依赖提供） ========== **/

/** ==================== defineExpose ================ **/
</script>

<style scoped>
.main-page {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* 三维地球铺满全屏 */
.main-page > :deep(*) {
  position: absolute;
  inset: 0;
}

/* 顶部工具栏固定在顶部，高度由内容决定（演示 props/插槽组合） */
.main-page :deep(.app-header) {
  top: 0;
  left: 0;
  right: 0;
  bottom: auto;
  z-index: 10;
}

.logo {
  font-size: 20px;
  line-height: 1;
}

.tool-btn {
  padding: 4px 12px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.2s;
}

.tool-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
