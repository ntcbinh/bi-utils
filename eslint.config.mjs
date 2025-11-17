import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import prettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";

export default defineConfig([
  {
    ignores: [
      ".next/**",
      ".env",
      "node_modules",
      "public/**",
      "next.config.ts",
      "postcss.config.mjs",
    ],
  },
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: { globals: globals.browser },
  },
  {
    rules: {
      "no-unused-vars": ["warn"],
      "no-undef": ["warn"],
      "class-methods-use-this": "warn",
      "no-unused-expressions": ["warn"],
      "no-useless-constructor": 0,
      "no-loop-func": 0,
    },
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    plugins: { prettier },
    rules: {
      "prettier/prettier": "error",
    },
  },

  configPrettier,
]);
