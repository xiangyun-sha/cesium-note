<template>
  <div class="about-page">
    <h1>关于页面</h1>
    <p>本页面用于验证 KeepAlive 路由缓存的有效性：</p>
    <ul>
      <li>从首页切到这里，再切回首页；</li>
      <li>若控制台出现 <code>MainPage mounted</code> 仅一次，说明首页被缓存（未重建）；</li>
      <li>若每次切回都出现 <code>CesiumViewer mounted</code>，说明缓存未生效。</li>
    </ul>
    <button class="back-btn" @click="onBack">← 返回首页</button>
  </div>
</template>

<script setup lang="ts">
/**
 * @BUILD_TIME 2026-08-03
 * @DESCRIPTION 关于页：用于验证 KeepAlive 路由缓存的有效性
 * @CREATOR xiangyun_sha
 */

/** ==================== 外部引入 ==================== **/
import { useRouter } from "vue-router";

/** ==================== 内部引入 ==================== **/

/** ==================== 类型定义 ==================== **/

/** ==================== 事件处理 ==================== **/
const router = useRouter();
const onBack = () => router.push("/");
</script>

<style scoped>
.about-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 12px;
  padding: 24px;
  box-sizing: border-box;
  background: linear-gradient(160deg, #1e2330, #141824);
  color: #fff;
}

.about-page h1 {
  margin: 0;
}

.about-page p,
.about-page li {
  color: #c6cbd8;
  line-height: 1.8;
}

.about-page code {
  padding: 1px 6px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.12);
  color: #ffd479;
}

.back-btn {
  margin-top: 8px;
  padding: 8px 20px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
