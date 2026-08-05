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
        <el-button class="tool-btn" @click="onZoomIn">放大</el-button>
        <el-button class="tool-btn" @click="onResetCamera">复位</el-button>
        <el-button class="tool-btn" @click="onGoAbout">关于</el-button>
      </template>
    </HeaderWidget>
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

/** ==================== 内部引入 ==================== **/
import { CesiumWidget } from "@/widgets/cesium-viewer";
import { HeaderWidget } from "@/widgets/header";
import { useMainPageActions } from "../model/useMainPageActions";

/** ==================== 组件标识 ==================== **/
/** KeepAlive 的 include 通过组件 name 匹配，必须显式声明 */
defineOptions({ name: "MainPage" });

/** ==================== 类型定义 ==================== **/

/** ==================== Props / Emits ============== **/

/** ==================== 响应式变量 / 常量 =========== **/

/** ==================== Inject（依赖注入） ========== **/

/** ==================== 组合式函数 ================== **/
/** 按钮交互逻辑（相机放大 / 复位 / 路由跳转）统一抽离至 useMainPageActions */
const { onZoomIn, onResetCamera, onGoAbout } = useMainPageActions();

/** ==================== 事件处理 ==================== **/

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

<style scoped src="./MainPage.css"></style>
