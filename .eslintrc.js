module.exports = {
  extends: [
    "custom",
    "eslint:recommended",
    "plugin:typescript-sort-keys/recommended",
  ],
  overrides: [
    {
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      files: ["**/*.{ts,tsx}"],
      rules: {
        "@typescript-eslint/await-thenable": "warn",
        "@typescript-eslint/no-floating-promises": "warn",
        "@typescript-eslint/no-misused-promises": "warn",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "simple-import-sort",
    "typescript-sort-keys",
  ],
  rules: {
  },
  root: true,
};
