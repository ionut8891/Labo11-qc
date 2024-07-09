import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { fixupConfigRules } from "@eslint/compat";


export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  {languageOptions: { globals: globals.node }},
  {
    "rules": {
      "complexity": ["error", 10],
      "max-depth": ["error", 4],
      "max-lines": ["error", 300],
      "max-lines-per-function": ["error", 50],
      "max-nested-callbacks": ["error", 3],
      "max-params": ["error", 4],
      "max-statements": ["error", 10],
      "no-var": "error",
      "eqeqeq": ["error", "always"]
    }
  },
  pluginJs.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),

];