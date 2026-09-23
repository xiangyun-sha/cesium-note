/**
 * @BUILD_TIME 2026-08-05
 * @DESCRIPTION MainPage 交互行为组合式函数：封装 el-button 事件处理逻辑（相机控制 / 路由跳转）
 * @CREATOR xiangyun_sha
 * @MODIFIED_RECORD
 *  - TIME: ; AUTHOR: ; DESC:  (add more if needed);
 */

/** ==================== 外部引入 ==================== **/
import { useRouter } from "vue-router";

/** ==================== 内部引入 ==================== **/
import { ViewerSingleton } from "@/widgets/cesium-viewer";

/**
 * MainPage 按钮交互逻辑
 * - onZoomIn：通过单例安全获取地球实例，放大相机（未初始化时优雅降级）
 * - onResetCamera：复位相机视角
 * - onGoAbout：跳转到关于页（用于验证 KeepAlive）
 */
export function useMainPageActions() {
  const router = useRouter();

  /** 放大相机 */
  const onZoomIn = () => {
    const viewer = ViewerSingleton.getInstance().getViewer();
    if (!viewer) return;
    const height = viewer.camera.positionCartographic.height;
    viewer.camera.zoomIn(height * 0.3);
  };

  /** 复位相机视角 */
  const onResetCamera = () => {
    const viewer = ViewerSingleton.getInstance().getViewer();
    if (!viewer) return;
    viewer.camera.flyHome(2);
  };

  /** 跳转到关于页（用于验证 KeepAlive） */
  const onGoAbout = () => router.push("/about");

  return { onZoomIn, onResetCamera, onGoAbout };
}
