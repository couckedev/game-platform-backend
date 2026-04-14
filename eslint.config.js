// @ts-check
import boundaries from "eslint-plugin-boundaries";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

/**
 * DDD Layer tags (assigned in each project's project.json under "tags"):
 *
 *   type:domain          — Pure domain layer: entities, value objects, aggregates, domain events
 *   type:application     — Application layer: use cases, ports, application services
 *   type:infrastructure  — Infrastructure layer: adapters, repositories impl, external services
 *   type:app             — Deployable application (NestJS, Next.js, etc.)
 *   type:shared-kernel   — Shared kernel: flat package with shared types, VOs, utilities (no DDD layers)
 *   scope:<bc-name>      — Bounded context name (e.g. scope:catalog, scope:orders)
 *   scope:shared         — Shared kernel / cross-cutting concerns
 *
 * Allowed dependency flow (Clean Architecture):
 *
 *   shared  ←  domain  ←  application  ←  infrastructure  ←  app
 *
 * Special cases explicitly allowed:
 *
 *   infrastructure → shared-kernel:
 *     Infrastructure may import shared-kernel types to reconstitute stored or serialized
 *     domain events and value objects (e.g. for the outbox pattern or event sourcing).
 *     This is intentional and NOT a model-smell when shared-kernel types are pure value
 *     types with no side effects. Already covered by the general "shared ← everyone" rule.
 *
 *   shared-kernel → shared-kernel:
 *     Forbidden. Shared-kernel packages must stay independent from one another to avoid
 *     transitive coupling between bounded contexts through chained shared dependencies.
 */

/** @type {import('eslint').Linter.Config[]} */
const config = [
  {
    ignores: ["node_modules/**", "dist/**", ".nx/**", "coverage/**", "tmp/**"],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": /** @type {any} */ (tsPlugin),
      boundaries,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.base.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      "boundaries/include": ["apps/**/*", "packages/**/*"],
      "boundaries/elements": [
        {
          type: "domain",
          pattern: "packages/*/domain/src",
          capture: ["bc"],
        },
        {
          type: "application",
          pattern: "packages/*/application/src",
          capture: ["bc"],
        },
        {
          type: "infrastructure",
          pattern: "packages/*/infrastructure/src",
          capture: ["bc"],
        },
        {
          type: "shared",
          pattern: "packages/shared-kernel{,-*}/src",
        },
        {
          type: "app",
          pattern: "apps/*/src",
          capture: ["appName"],
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
            // shared-kernel can be imported by everyone (including infrastructure —
            // infrastructure may need shared VOs to reconstitute domain events from storage)
            {
              from: ["domain", "application", "infrastructure", "app"],
              allow: ["shared"],
            },
            // domain can only import from same-BC domain and shared-kernel
            {
              from: ["domain"],
              allow: [["domain", { bc: "${from.bc}" }]],
            },
            // application can import from same-BC domain and shared-kernel
            {
              from: ["application"],
              allow: [["domain", { bc: "${from.bc}" }]],
            },
            // infrastructure can import from same-BC application, same-BC domain, and shared-kernel
            {
              from: ["infrastructure"],
              allow: [
                ["domain", { bc: "${from.bc}" }],
                ["application", { bc: "${from.bc}" }],
              ],
            },
            // apps can import from infrastructure and application (any BC)
            {
              from: ["app"],
              allow: ["infrastructure", "application"],
            },
            // shared-kernel packages must not depend on other packages, including other shared-kernels
            {
              from: ["shared"],
              allow: [],
            },
          ],
        },
      ],
      "boundaries/no-unknown": "error",
      "boundaries/no-unknown-files": "warn",

      // General best practices
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
    },
  },
  {
    files: ["**/*.spec.ts", "**/*.test.ts"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
    },
  },
];

export default config;
