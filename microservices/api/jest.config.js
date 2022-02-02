module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",

  transform: { "\\.ts$": ["ts-jest"] },

  moduleNameMapper: {
    "@root/(.*)": "<rootDir>/src/$1",
    "@bundles/(.*)": "<rootDir>/src/bundles/$1",
  },

  // TODO: https://stackoverflow.com/questions/50171412/jest-typescript-absolute-paths-baseurl-gives-error-cannot-find-module
};
