import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import nx from "@nx/eslint-plugin";

export default defineConfig([
  globalIgnores([
    "dist",
    "node_modules",
    ".vite",
    "build",
    "coverage",
  ]),

  // JS + JSX
  {
    files: ["**/*.js", "**/*.jsx"],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },

  // TS + TSX
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      "@nx": nx,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@nx/enforce-module-boundaries": [
        "error",
        {
          allow: [],
          depConstraints: [
            {
              sourceTag: "type:app",
              onlyDependOnLibsWithTags: ["type:ui", "type:hooks", "type:i18n"],
            },
            {
              sourceTag: "type:ui",
              onlyDependOnLibsWithTags: ["type:hooks", "type:i18n"],
            },
            {
              sourceTag: "type:hooks",
              onlyDependOnLibsWithTags: ["type:i18n"],
            },
            {
              sourceTag: "type:i18n",
              onlyDependOnLibsWithTags: [],
            },
          ],
        },
      ],
    },
  },

  // Node config files
  {
    files: ["vite.config.*", "*.config.*"],
    languageOptions: {
      globals: globals.node,
    },
  },
]);
