import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import prettierConfigCustom from "./prettier.config.mjs";

export default defineConfig([
  globalIgnores([
    ".next/**",
    "out/**",
    "node_modules/**",
    "public/**",
    "next-env.d.ts",
    "app/generated/**",
  ]),

  ...nextVitals,
  ...nextTs,

  eslintPluginPrettierRecommended,

  {
    rules: {
      "prettier/prettier": ["error", prettierConfigCustom],
    },
  },
]);
