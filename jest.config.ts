import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  verbose: true,
  testPathIgnorePatterns: ["./node_modules/", "./.next/", ".jsx", ".js"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
};

export default config;
