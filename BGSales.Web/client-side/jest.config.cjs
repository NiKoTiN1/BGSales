
module.exports = {
  roots: ["<rootDir>"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx)$",
  moduleFileExtensions: ["tsx", "js", "jsx", "json", "node"],
  collectCoverage: true,
  clearMocks: true,
  resetMocks: false,
  setupFiles: ["jest-localstorage-mock"],
  coverageDirectory: "coverage",
  setupFilesAfterEnv: ["./__test__/testSetup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^.+.(css|styl|less|sass|scss|png|svg|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
  },
  globals: {
    "ts-jest": {
      tsconfig: "__test__/tsconfig.jest.json",
      useESM: true,
    },
	"window": {}
  },
};
var localStorageMock = (function () {
	var store = {};
	return {
		getItem: function (key) {
			return store[key];
		},
		setItem: function (key, value) {
			store[key] = value.toString();
		},
		clear: function () {
			store = {};
		},
		removeItem: function (key) {
			delete store[key];
		}
	};
})();
