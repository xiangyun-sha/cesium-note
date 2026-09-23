```bash
cesium-note
├─ 1 Theory
│  ├─ Part.0 Mathematical Foundation
│  │  ├─ Chr.1 coordinate frame
│  │  └─ Chr.2 time frame
│  ├─ Part.1 Intro & Quick Start
│  ├─ Part.2 Core
│  │  ├─ Chr.1 Viewer
│  │  ├─ Chr.2 Scene
│  │  └─ Chr.3 Camera
│  ├─ Part.3 Data
│  │  ├─ Chr.1 Geographics
│  │  ├─ Chr.2 3D Model
│  │  └─ Chr3 TimeSeries
│  ├─ Part.4 Interaction
│  ├─ Part.5 Base Rendering
│  │  ├─ Chr.1 Entity
│  │  └─ Chr.2 Primitive
│  ├─ Part.6 Analysis
│  ├─ Part.7 Advaced Rendering
│  │  ├─ Chr.1 PointCloud
│  │  ├─ Chr.2 Volumetric
│  │  └─ Chr.3 GaussianSplatting
│  └─ Part.8 Performance & Optimization
├─ 3 Project
│  └─ project_1
│     ├─ .editorconfig
│     ├─ .prettierrc
│     ├─ DOC
│     │  ├─ markdown
│     │  └─ plantuml
│     ├─ Dockerfile
│     ├─ README.md
│     ├─ index.html
│     ├─ jenkinsfile
│     ├─ nginx.conf
│     ├─ package.json
│     ├─ pnpm-lock.yaml
│     ├─ pnpm-workspace.yaml
│     ├─ public
│     │  ├─ favicon.svg
│     │  └─ icons.svg
│     ├─ src
│     │  ├─ app
│     │  │  ├─ App.vue
│     │  │  └─ main.ts
│     │  ├─ entities
│     │  ├─ features
│     │  ├─ pages
│     │  ├─ shared
│     │  │  ├─ images
│     │  │  │  ├─ hero.png
│     │  │  │  ├─ vite.svg
│     │  │  │  └─ vue.svg
│     │  │  └─ styles
│     │  │     └─ root.css
│     │  └─ widgets
│     │     └─ cesium-viewer
│     │        ├─ index.ts
│     │        ├─ lib
│     │        │  └─ ViewerSingleton.ts
│     │        └─ ui
│     │           └─ cesiumViewer.vue
│     ├─ steiger.config.ts
│     ├─ tsconfig.app.json
│     ├─ tsconfig.json
│     ├─ tsconfig.node.json
│     ├─ vite.config.ts
│     └─ vitest.config.ts
└─ README.md
```

```bash
1 Theory/
├─ Part.0 Prologue（预备篇）
│  ├─ Chr.0 Mathematical Foundation
│  │  ├─ 0.1 Coordinate Frame
│  │  ├─ 0.2 Projection
│  │  └─ 0.3 Time Frame
│  ├─ Chr.1 Quick Start
│  │  ├─ 1.1 Environment Setup
│  │  ├─ 1.2 First Viewer
│  │  ├─ 1.3 First GeoJSON
│  │  └─ 1.4 Troubleshooting
│  └─ Chr.2 Core API
│     ├─ 2.1 Viewer
│     ├─ 2.2 Scene
│     ├─ 2.3 Globe
│     └─ 2.4 Camera
│
├─ Part.1 Data & Rendering（数据与渲染）
│  ├─ Chr.1 Base Rendering
│  │  ├─ 1.1 Entity
│  │  ├─ 1.2 Primitive
│  │  └─ 1.3 Entity vs Primitive
│  ├─ Chr.2 Data
│  │  ├─ 2.1 Geographics
│  │  ├─ 2.2 3D Model
│  │  └─ 2.3 TimeSeries
│  └─ Chr.3 Advanced Rendering
│     ├─ 3.1 PointCloud
│     ├─ 3.2 Volumetric
│     └─ 3.3 GaussianSplatting
│
├─ Part.2 Interaction（交互）
│  ├─ Chr.1 Event System
│  ├─ Chr.2 Event Pipeline
│  ├─ Chr.3 Mode & Strategy
│  └─ Chr.4 Toolbox
│
├─ Part.3 Analysis（分析）
│  ├─ Chr.1 Basic Analysis
│  ├─ Chr.2 Geometry Computation
│  ├─ Chr.3 Graph Analysis
│  └─ Chr.4 Volumetric Analysis
│
└─ Part.4 Performance & Optimization（性能与优化）
   ├─ Chr.1 Frame & Render Loop
   ├─ Chr.2 Memory Management
   ├─ Chr.3 Data Scheduling
   └─ Chr.4 Pipeline Optimization
```
