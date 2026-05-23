import { defineConfig } from "drizzle-kit";
import { DRIZZLE_MIGRATION_FOLDER } from "./src/database/drizzle.constants";

export default defineConfig({
  schema: "./src/database/schemas/index.ts",
  out: DRIZZLE_MIGRATION_FOLDER,
  dialect: "postgresql",
  dbCredentials: {
    url: process.env["DATABASE_URL"] ?? (() => { throw new Error("DATABASE_URL is required") })(),
  },
});