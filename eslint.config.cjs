const globals = require("globals")
const tseslint = require("typescript-eslint")
const reactPlugin = require("eslint-plugin-react")
const reactHooksPlugin = require("eslint-plugin-react-hooks")
const reactRefreshPlugin = require("eslint-plugin-react-refresh")
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended")
const { defineConfig } = require("eslint/config")

module.exports = defineConfig(
  {
    ignores: ["dist", "node_modules", "eslint.config.cjs", "vite.config.ts"],
  },
  {
    extends: [...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "react-refresh": reactRefreshPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        }
      },
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    rules: {
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactHooksPlugin.configs["recommended-latest"].rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  eslintPluginPrettierRecommended,
)
