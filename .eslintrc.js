module.exports = {
  root: true,
  overrides: [
    {
      files: ["*.js"],
      parserOptions: {
        ecmaVersion: 2018,
      },
    },
    {
      files: ["*.ts"],
      parserOptions: {
        project: ["tsconfig.*?.json"],
        createDefaultProgram: true,
        tsconfigRootDir: __dirname,
      },
      extends: [
        "plugin:@angular-eslint/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
      ],
      rules: {
        "@angular-eslint/component-class-suffix": [
          "error",
          {
            suffixes: ["Component", "Page"],
          },
        ],
        "@angular-eslint/directive-selector": [
          "error",
          { type: "attribute", prefix: "app", style: "camelCase" },
        ],
        "@angular-eslint/component-selector": [
          "error",
          { type: "element", prefix: "app", style: "kebab-case" },
        ],
      },
    },
    {
      files: ["*.html"],
      extends: ["plugin:@angular-eslint/template/recommended"],
    },
    {
      files: ["*.component.ts"],
      extends: ["plugin:@angular-eslint/template/process-inline-templates"],
    },
  ],
};
