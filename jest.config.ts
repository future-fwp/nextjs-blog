import type { Config } from "@jest/types";
import nextJest from "next/jest";

// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
const createJestConfig = nextJest({
	dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig: Config.InitialOptions = {
	// Add setup files before running tests
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

	// Use jsdom for browser-like environment
	testEnvironment: "jsdom",

	// Handle module aliases (if you're using them in Next.js)
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/$1",
	},

	// Transform TypeScript files using ts-jest
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest",
	},

	// Test file patterns
	testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig);
