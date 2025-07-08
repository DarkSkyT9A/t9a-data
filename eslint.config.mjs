import globals from "globals";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { 
    files: ["**/*.js"], 
    languageOptions: { 
      sourceType: "commonjs",
      globals: { ...globals.browser, ...globals.node } 
    },
    rules: {
			semi: ["error"],
      "no-undef": ["error"]
		}, 
  },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: { ...globals.browser, ...globals.node } } },
]);
