/**
 * @BUILD_TIME 2026-08-03 14:48:50
 * @DESCRIPTION Description of the file/module
 * @CREATOR Your Name
 * @MODIFIED_RECORD
 *  - TIME: 2026-08-03; AUTHOR: xiangyun_sha; DESC: Initial creation;
 *  - TIME: ; AUTHOR: ; DESC:  (add more if needed);
 */

/** ==================== 外部引入 ==================== **/
import * as Cesium from "cesium";

/** ==================== 内部引入 ==================== **/

/** ==================== 类型定义 ==================== **/

/** ==================== 常量定义 ==================== **/
/** 默认挂载容器 id（未显式传入容器时使用） */
const DEFAULT_CONTAINER = "cesiumContainer";

/** 默认 Viewer 构造参数（按需隐藏常用控件） */
const DEFAULT_VIEWER_OPTIONS: Cesium.Viewer.ConstructorOptions = {
  animation: false,
  timeline: false,
  baseLayerPicker: false,
  geocoder: false,
  homeButton: false,
  sceneModePicker: false,
  navigationHelpButton: false,
  fullscreenButton: false,
  infoBox: false,
  selectionIndicator: false,
};

/** ====================  类定义  ==================== **/

/**
 * CesiumViewer 单例封装
 *
 * 全局唯一 Cesium.Viewer 实例，支持：
 *  - 懒加载：首次访问 `viewer` 时才真正创建；
 *  - 全局共享：任意模块调用 `getInstance()` 拿到同一实例；
 *  - 生命周期管理：`destroy()` 释放资源后可重新创建。
 */
export default class ViewerSingleton {
  /** 唯一实例引用 */
  private static _instance: ViewerSingleton | null = null;

  /** Cesium.Viewer 实例（懒加载，null 表示尚未创建） */
  private _viewer: Cesium.Viewer | null = null;

  /** 挂载容器 */
  private readonly _container: HTMLElement | string;

  /** 构造参数 */
  private readonly _options: Cesium.Viewer.ConstructorOptions;

  /** 私有构造函数：禁止外部直接 new，只能通过 getInstance 获取 */
  private constructor(
    container: HTMLElement | string,
    options: Cesium.Viewer.ConstructorOptions,
  ) {
    this._container = container;
    this._options = options;
  }

  /**
   * 设置 Cesium Ion 访问令牌（建议在应用入口调用一次）
   */
  public static setAccessToken(token: string): void {
    Cesium.Ion.defaultAccessToken = token;
  }

  /**
   * 获取全局唯一实例（单例入口）
   * @param container 挂载容器（DOM 元素或 id），仅在首次创建时生效
   * @param options   Cesium.Viewer 构造参数，仅在首次创建时生效
   */
  public static getInstance(
    container?: HTMLElement | string,
    options?: Cesium.Viewer.ConstructorOptions,
  ): ViewerSingleton {
    if (!ViewerSingleton._instance) {
      ViewerSingleton._instance = new ViewerSingleton(
        container ?? DEFAULT_CONTAINER,
        { ...DEFAULT_VIEWER_OPTIONS, ...options },
      );
    }
    return ViewerSingleton._instance;
  }

  /** 获取 Cesium.Viewer 实例（首次访问时自动创建） */
  public get viewer(): Cesium.Viewer {
    if (!this._viewer) {
      this._viewer = this._createViewer();
    }
    return this._viewer;
  }

  /** 解析真实的容器 DOM 元素（字符串 id -> Element） */
  private resolveContainer(): HTMLElement {
    if (typeof this._container === "string") {
      const el = document.getElementById(this._container);
      if (!el) {
        throw new Error(
          `[ViewerSingleton] 未找到容器元素：#${this._container}`,
        );
      }
      return el as HTMLElement;
    }
    return this._container;
  }

  /** 创建并返回一个新的 Cesium.Viewer */
  private _createViewer(): Cesium.Viewer {
    return new Cesium.Viewer(this.resolveContainer(), this._options);
  }

  /**
   * 销毁 viewer 并重置单例
   * 之后再次调用 getInstance() 会重新创建实例
   */
  public destroy(): void {
    if (this._viewer && !this._viewer.isDestroyed()) {
      this._viewer.destroy();
    }
    this._viewer = null;
    ViewerSingleton._instance = null;
  }
}

/** --------------------  抽象层  -------------------- **/

/** --------------------  实现层  -------------------- **/

/** ==================== 辅助函数 ==================== **/

/** ====================  导出层  ==================== **/
