import globals from "globals";

export default [
  {
    files: ["src/**/*.js", "data/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "no-var": "error",
      "no-unused-vars": "error",
      semi: ["error", "always"],
      eqeqeq: "error",
      camelcase: "error",
      "no-console": "error",
    },
  },
  {
    files: ["test/**/*.js", "cypress/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.mocha,
        cy: "readonly",
        Cypress: "readonly",
      },
    },
    rules: {
      "no-var": "error",
      "no-unused-vars": "error",
      semi: ["error", "always"],
      eqeqeq: "error",
      camelcase: "error",
      "no-console": "error",
    },
  },
];
