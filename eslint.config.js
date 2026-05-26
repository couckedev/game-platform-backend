// @ts-check
import boundaries from "eslint-plugin-boundaries";
import importPlugin from "eslint-plugin-import";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

/**
 * Layer enforcement for DDD/Clean Architecture layers:
 *
 *   type:domain         — Pure domain: entities, value objects, aggregates, domain events
 *   type:application    — Application: use cases, ports, application services
 *   type:infrastructure — Infrastructure: repository impls, adapters, external services
 *
 * Allowed dependency flow (inner layers never depend on outer layers):
 *
 *   domain  ←  application  ←  infrastructure
 *
 * Cross-cutting shared packages (packages/shared/*) are excluded from
 * boundary checks and can be imported freely by any layer.
 */

/** @type {import('eslint').Linter.Config[]} */
const config = [
  {
    ignores: ["node_modules/**", "dist/**", ".nx/**", "coverage/**", "tmp/**"],
  },
  {
    files: ["packages/*/*/src/**/*.ts"],
    plugins: {
      "@typescript-eslint": /** @type {any} */ (tsPlugin),
      boundaries,
      import: /** @type {any} */ (importPlugin),
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.base.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      "boundaries/include": [
        "packages/*/domain/src/**",
        "packages/*/application/src/**",
        "packages/*/infrastructure/src/**",
      ],
      "boundaries/elements": [
        {
          type: "domain",
          pattern: "packages/*/domain/src/**",
          capture: ["bc"],
        },
        {
          type: "application",
          pattern: "packages/*/application/src/**",
          capture: ["bc"],
        },
        {
          type: "infrastructure",
          pattern: "packages/*/infrastructure/src/**",
          capture: ["bc"],
        },
      ],
    },
    rules: {
      // TypeScript strict rules
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        { allowExpressions: true, allowTypedFunctionExpressions: true },
      ],
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-misused-promises": "error",

      // DDD Boundary rules
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            // domain can only import from same-BC domain
            {
              from: ["domain"],
              allow: [["domain", { bc: "${from.bc}" }]],
            },
            // application can import from same-BC domain
            {
              from: ["application"],
              allow: [["domain", { bc: "${from.bc}" }]],
            },
            // infrastructure can import from same-BC domain and application
            {
              from: ["infrastructure"],
              allow: [
                ["domain", { bc: "${from.bc}" }],
                ["application", { bc: "${from.bc}" }],
              ],
            },
          ],
        },
      ],
      "boundaries/no-unknown": "off",
      "boundaries/no-unknown-files": "off",

      // General best practices
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],

      // Forbid importing packages not declared in the closest package.json,
      // but only for the DDD source layers — not for apps or config files.
      // The 'files' glob on this block already restricts to packages/*/*/src/.
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: false,
          optionalDependencies: false,
          peerDependencies: true,
        },
      ],
    },
  },
  {
    files: ["**/*.spec.ts", "**/*.test.ts"],
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "import/no-extraneous-dependencies": "off",
    },
  },
];

export default config;
