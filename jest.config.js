const config = {
  verbose: true,
  preset: "jest-expo",
  globals: {
    "ts-jest": {
      babelConfig: true,
    },
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^~/(.*)$": "<rootDir>/$1",
    "\\.svg": "<rootDir>/__mocks__/svgMock.js",
    "react-native-code-push": "<rootDir>/__mocks__/react-native-code-push.js",
    "@react-navigation": "<rootDir>/__mocks__/@react-navigation.js",
  },
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
  ],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "\\.snap$"],
  cacheDirectory: ".jest/cache",
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/__mocks__/mock-setup.js"],
};
