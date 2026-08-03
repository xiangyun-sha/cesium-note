<template>
  <header class="header">
    <div class="header__left">
      <slot name="left" />
    </div>

    <div class="header__center">
      <!-- 默认插槽：未提供时回退显示 title -->
      <slot>
        <span class="header__title">{{ title }}</span>
      </slot>
    </div>

    <div class="header__right">
      <slot name="right" />
    </div>
  </header>
</template>

<script setup lang="ts">
/**
 * @BUILD_TIME 2026-08-03 15:51:02
 * @DESCRIPTION 可复用的顶部工具栏骨架：props 定制标题，插槽注入左右/中间内容
 * @CREATOR xiangyun_sha
 * @MODIFIED_RECORD
 *  - TIME: 2026-08-03; AUTHOR: xiangyun_sha; DESC: 改造为支持 props/插槽的可复用骨架;
 *  - TIME: ; AUTHOR: ; DESC:  (add more if needed);
 */

/** ==================== 类型定义 ==================== **/

/** ==================== Props / Emits ============== **/
withDefaults(
  defineProps<{
    /** 标题文案（默认插槽为空时显示） */
    title?: string;
  }>(),
  { title: "" },
);
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  height: 56px;
  padding: 0 16px;
  box-sizing: border-box;
  background: rgba(20, 24, 33, 0.75);
  color: #fff;
  backdrop-filter: blur(6px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  user-select: none;
}

.header__left,
.header__right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.header__center {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
}

.header__title {
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
