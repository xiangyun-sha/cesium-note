// steiger.config.ts
// npx steiger src - 检验项目结构是否符合 fsd 规则
import { defineConfig } from "steiger";
import fsd from "@feature-sliced/steiger-plugin";

export default defineConfig([
  ...fsd.configs.recommended,
  {
    rules: {
      "fsd/public-api": "off",
      "fsd/ambiguous-slice-names": "off",
      "fsd/no-processes": "off",
    },
  },
]);
