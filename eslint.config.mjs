// eslint.config.js

import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig([
  // 1. Base configurations for all files
  js.configs.recommended, // Use the new recommended config syntax
  eslintConfigPrettier,

  // 2. Configuration for your source code (browser)
  {
    files: ["src/**/*.js"], // Target only files in the src folder
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  // 3. Configuration for your config files (Node.js)
  {
    files: [
      "eslint.config.mjs",
      "webpack.common.js", 
      "webpack.dev.js",   
      "webpack.prod.js"], // Target your config files
    languageOptions: {
      globals: {
        ...globals.node, // Use Node.js globals here
      },
    },
  },
]);