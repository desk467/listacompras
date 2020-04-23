module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ["<rootDir>/__tests__/setup.ts"],
  moduleNameMapper: {
    "^@root(.*)$": "<rootDir>$1",
    "^@controllers(.*)$": "<rootDir>/controllers$1",
    "^@database(.*)$": "<rootDir>/database$1",
    "^@models(.*)$": "<rootDir>/database/models$1",
    "^@middlewares(.*)$": "<rootDir>/middlewares$1"
  },
  testPathIgnorePatterns: [
    "<rootDir>/dist/",
    "<rootDir>/__tests__/setup.ts"
  ],
};