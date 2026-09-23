<template>
  <!--
    KeepAlive 范式：
    - RouterView 通过 v-slot 拿到当前页组件，交给 <component :is> 渲染
    - KeepAlive 按 include 白名单缓存页面：切走不销毁，切回秒复用
    - 命中白名单的页面（如 MainPage）被缓存；未命中的照常销毁重建
  -->
  <RouterView v-slot="{ Component }">
    <KeepAlive :include="keepAliveComponentList">
      <component :is="Component" />
    </KeepAlive>
  </RouterView>
</template>

<script setup lang="ts">
/**
 * @BUILD_TIME 2026-08-03 14:55:02
 * @DESCRIPTION 应用根组件：渲染当前路由对应的页面（KeepAlive 缓存范式）
 * @CREATOR xiangyun_sha
 * @MODIFIED_RECORD
 *  - TIME: 2026-08-03; AUTHOR: xiangyun_sha; DESC: 改用 RouterView 挂载路由页面;
 *  - TIME: 2026-08-03; AUTHOR: xiangyun_sha; DESC: 引入 KeepAlive 缓存页面，避免重型组件（Cesium）切换路由时销毁重建;
 *  - TIME: ; AUTHOR: ; DESC:  (add more if needed);
 */

/** ==================== 外部引入 ==================== **/
import { RouterView } from "vue-router";

/** ==================== 内部引入 ==================== **/

/** ==================== 类型定义 ==================== **/

/** ==================== 常量定义 ==================== **/
/**
 * KeepAlive 缓存白名单：填写需要缓存的页面组件名，
 * 需与各页面 defineOptions({ name: 'Xxx' }) 保持一致
 */
const keepAliveComponentList = ["MainPage"];

/** ==================== 响应式变量 / 常量 =========== **/

/** ==================== 生命周期 ==================== **/
</script>

<style scoped></style>
