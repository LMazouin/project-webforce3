import type { Config } from "@jest/types";

const config: Config.InitialProjectOptions = {
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
};

export default config;
