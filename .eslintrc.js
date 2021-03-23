module.exports = {
  root: true,
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  plugins: ["svelte3", "@typescript-eslint"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  env: {
    es6: true,
    browser: true,
    "jest/globals": true,
    node: true,
  },
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      modules: true,
    },
  },
  overrides: [
    {
      files: ["*.svelte"],
      processor: "svelte3/svelte3",
    },
  ],
  settings: {
    "svelte3/typescript": require("typescript"),
  },
};
