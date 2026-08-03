// steiger.config.ts
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
