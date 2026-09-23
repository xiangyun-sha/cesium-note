/**
 * @BUILD_TIME 2026-09-23
 * @DESCRIPTION 创建不依赖 Cesium ion 的底图影像源，实现零 Token 的本地 / 离线部署
 * @CREATOR GitHub Copilot
 * @MODIFIED_RECORD
 *  - TIME: 2026-09-23; AUTHOR: GitHub Copilot; DESC: Initial creation;
 */

/** ==================== 外部引入 ==================== **/
import * as Cesium from "cesium";

/** ==================== 内部引入 ==================== **/

/** ==================== 类型定义 ==================== **/

/** ==================== 常量定义 ==================== **/
/**
 * Cesium 包内置的离线影像切片目录：NaturalEarthII
 *
 * 特点：
 *  - Geographic（EPSG:4326）瓦片组织方式，可用层级仅 0~2 级，整包约 600KB；
 *  - 目录结构为 TMS 风格（Y 轴原点在南纬 90°），因此 URL 模板必须用 `{reverseY}`；
 *  - 会随 vite-plugin-static-copy 一起被复制到
 *    `${CESIUM_BASE_URL}/Assets/Textures/NaturalEarthII`，不产生任何外部网络请求，
 *    也不涉及任何 Access Token。
 */
const BUILTIN_IMAGERY_PATH = "Assets/Textures/NaturalEarthII";

/** 内置切片的最大层级（与 NaturalEarthII/tilemapresource.xml 中的 TileSet 一致） */
const BUILTIN_IMAGERY_MAX_LEVEL = 2;

/** ====================  类定义  ==================== **/

/** --------------------  抽象层  -------------------- **/

/** --------------------  实现层  -------------------- **/

/** ==================== 辅助函数 ==================== **/
/**
 * 创建底图影像源。
 *
 * 解析优先级：
 *  1. 环境变量 `VITE_TILE_URL_TEMPLATE` —— 自建 / 本地 XYZ 瓦片服务，
 *     例如内网 nginx 托管的切片目录：`/tiles/{z}/{x}/{y}.png`（默认按 Web Mercator 解析）；
 *  2. 回退到 Cesium 包内置的 NaturalEarthII 离线切片（纯本地、无外部请求，但仅 0~2 级，
 *     放到城市级高度会明显模糊 —— 需要清晰影像时请配置 `VITE_TILE_URL_TEMPLATE`）。
 *
 * 两条路径都不涉及 Cesium ion，因此整个应用无需配置任何 Access Token。
 * 返回的 provider 由 Viewer 接管生命周期，无需手动 destroy。
 */
export function createBaseImageryProvider(): Cesium.ImageryProvider {
  const urlTemplate = import.meta.env.VITE_TILE_URL_TEMPLATE as
    | string
    | undefined;

  if (urlTemplate) {
    return new Cesium.UrlTemplateImageryProvider({
      url: urlTemplate,
      // 第三方瓦片服务的版权署名，按需通过 VITE_TILE_ATTRIBUTION 配置
      credit: import.meta.env.VITE_TILE_ATTRIBUTION as string | undefined,
    });
  }

  // 注意：不能使用 TileMapServiceImageryProvider —— Cesium 1.143 起它的构造函数
  // 已不再接受 url（必须走异步的 fromUrl），而 baseLayer 需要同步就能拿到 provider。
  // 因此直接用官方推荐的 URL 模板方式读取同一份切片。
  return new Cesium.UrlTemplateImageryProvider({
    url: `${Cesium.buildModuleUrl(BUILTIN_IMAGERY_PATH)}/{z}/{x}/{reverseY}.jpg`,
    tilingScheme: new Cesium.GeographicTilingScheme(),
    minimumLevel: 0,
    maximumLevel: BUILTIN_IMAGERY_MAX_LEVEL,
  });
}

/** ====================  导出层  ==================== **/
