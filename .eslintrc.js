module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "airbnb-base",
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "import/prefer-default-export": "off",
    "no-unused-expressions": "off",
    "no-empty-source": "off",
    "max-len": [
      "error",
      {
        ignoreComments: true,
        ignoreUrls: true,
      },
    ],
    "no-param-reassign": [
      "error",
      {
        props: false,
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
  },
  settings: {
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  plugins: ["jest", "@typescript-eslint"],
};
