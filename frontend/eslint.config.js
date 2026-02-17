// eslint.config.js
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: "@babel/eslint-parser", // Or "@typescript-eslint/parser" if using TS
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    requireConfigFile: false,
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: ["react", "react-refresh", "jsx-a11y"],
  rules: {
    // Allow unused vars that start with _
    "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    // Fast Refresh only export components rule
    "react-refresh/only-export-components": "warn",
    // Other useful React rules
    "react/prop-types": "off", // disable if using TS
    "react/react-in-jsx-scope": "off", // React 17+ with JSX transform
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
