export default {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "prettier/prettier": "error",
    "spaced-comment": ["error", "always"],
    "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
    "@typescript-eslint/brace-style": "error",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/func-call-spacing": ["error", "never"],
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/member-delimiter-style": "off",
    "@typescript-eslint/no-require-imports": "warn",
    "@typescript-eslint/no-unnecessary-condition": ["error"],
    "@typescript-eslint/no-unnecessary-qualifier": "error",
    "@typescript-eslint/no-unnecessary-type-arguments": "error",
    "@typescript-eslint/no-unused-expressions": "error",
    "@typescript-eslint/no-useless-constructor": "error",
    "@typescript-eslint/prefer-for-of": "error",
    "@typescript-eslint/promise-function-async": "error",
    "@typescript-eslint/require-array-sort-compare": "error",
    "@typescript-eslint/restrict-plus-operands": "error",
    "@typescript-eslint/semi": [
      "error",
      "always",
      { omitLastInOneLineBlock: false },
    ],
    "array-callback-return": "error",
    "block-scoped-var": "error",
    "consistent-return": "error",
    curly: "error",
    "default-case": "error",
    "default-param-last": "error",
    "dot-notation": "error",
    eqeqeq: ["error", "always"],
    "global-require": "error",
    "guard-for-in": "error",
    "no-alert": "error",
    "no-buffer-constructor": "error",
    "no-caller": "error",
    "no-div-regex": "error",
    "no-else-return": "error",
    "no-empty-function": ["error", { allow: ["constructors"] }],
    "no-eq-null": "error",
    "no-eval": "error",
    "no-extend-native": "error",
    "no-extra-bind": "error",
    "no-floating-decimal": "error",
    "no-implicit-coercion": "error",
    "no-implied-eval": "error",
    "no-import-assign": "error",
    "no-invalid-this": "error",
    "no-iterator": "error",
    "no-label-var": "error",
    "no-labels": "error",
    "no-lone-blocks": "error",
    "no-loop-func": "error",
    "no-multi-spaces": "error",
    "no-multi-str": "error",
    "no-new-func": "error",
    "no-new-wrappers": "error",
    "no-new": "error",
    "no-octal-escape": "error",
    "no-param-reassign": "error",
    "no-path-concat": "error",
    "no-process-exit": "error",
    "no-proto": "error",
    "no-prototype-builtins": "off",
    "no-restricted-modules": ["error", "moment"],
    "no-return-assign": "error",
    "no-return-await": "error",
    "no-script-url": "error",
    "no-self-compare": "error",
    "no-sequences": "error",
    "no-shadow": "off",
    "no-sync": ["error", { allowAtRootLevel: true }],
    "no-template-curly-in-string": "error",
    "no-throw-literal": "error",
    "no-undef-init": "error",
    "no-unmodified-loop-condition": "error",
    "no-use-before-define": "error",
    "no-useless-call": "error",
    "no-useless-concat": "error",
    "no-void": "error",
    "prefer-named-capture-group": "warn",
    "prefer-promise-reject-errors": "error",
    "prefer-regex-literals": "error",
    radix: "error",
    "require-atomic-updates": "off",
    "require-unicode-regexp": "error",
    strict: "error",
    "wrap-iife": ["error", "any"],
    yoda: "error",
    "array-bracket-spacing": ["error", "never"],
    "array-element-newline": ["error", "consistent"],
    "block-spacing": "error",
    camelcase: "warn",
    // "capitalized-comments": ["error", "always"],
    "comma-spacing": ["error", { before: false, after: true }],
    "comma-style": ["error", "last"],
    "computed-property-spacing": ["error", "never"],
    "eol-last": ["error", "always"],
    "func-name-matching": ["error", "always"],
    "func-names": ["error", "as-needed"],
    "func-style": ["error", "declaration"],
    "function-call-argument-newline": ["error", "consistent"],
    "jsx-quotes": ["error", "prefer-double"],
    "key-spacing": ["error", { beforeColon: false }],
    "keyword-spacing": ["error", { before: true, after: true }],
    "linebreak-style": ["off", "unix"],
    "lines-between-class-members": ["error", "always"],
    "max-depth": ["error", 5],
    "max-nested-callbacks": ["error", 10],
    "max-params": ["error", 10],
    "max-statements-per-line": ["error", { max: 2 }],
    "multiline-comment-style": ["error", "separate-lines"],
    "new-parens": "error",
    "newline-per-chained-call": ["error", { ignoreChainWithDepth: 3 }],
    "no-array-constructor": "error",
    "no-bitwise": "warn",
    "no-lonely-if": "error",
    "no-multi-assign": "error",
    "no-multiple-empty-lines": "error",
    "no-negated-condition": "warn",
    "no-nested-ternary": "error",
    "no-new-object": "error",
    "no-tabs": "error",
    "no-trailing-spaces": "error",
    "no-unneeded-ternary": "error",
    "no-whitespace-before-property": "error",
    "object-curly-spacing": ["error", "always"],
    "one-var": ["error", "never"],
    "operator-assignment": ["error", "always"],
    "padded-blocks": ["error", { classes: "never" }],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: ["const", "let"], next: "*" },
      {
        blankLine: "any",
        prev: ["const", "let"],
        next: ["const", "let", "var"],
      },
      { blankLine: "always", prev: "directive", next: "*" },
      { blankLine: "any", prev: "directive", next: "directive" },
      { blankLine: "always", prev: "break", next: "*" },
      { blankLine: "always", prev: "block-like", next: "*" },
    ],
    "prefer-object-spread": "error",
    "quote-props": ["error", "as-needed"],
    "semi-spacing": ["error", { before: false, after: true }],
    "semi-style": ["error", "last"],
    "space-before-blocks": "error",
    "space-in-parens": ["error", "never"],
    "space-infix-ops": ["error", { int32Hint: false }],
    "space-unary-ops": "error",
    "switch-colon-spacing": ["error", { before: false, after: true }],
    "template-tag-spacing": ["error", "never"],
    "unicode-bom": ["error", "never"],
    "arrow-parens": ["error", "as-needed"],
    "arrow-spacing": ["error", { before: true, after: true }],
    "generator-star-spacing": ["error", { before: true, after: false }],
    "no-confusing-arrow": "error",
    "no-duplicate-imports": "error",
    "no-useless-computed-key": "error",
    "no-useless-rename": "error",
    "no-var": "error",
    "object-shorthand": ["error", "properties"],
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    "prefer-destructuring": "error",
    "prefer-numeric-literals": "error",
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "prefer-template": "error",
    "rest-spread-spacing": ["error", "never"],
    "sort-imports": [
      "error",
      { ignoreCase: true, ignoreDeclarationSort: true },
    ],
    "template-curly-spacing": ["error", "never"],
    "yield-star-spacing": ["error", "before"],
  },
};
