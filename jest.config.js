module.exports = {
  // Avoid react-native preset to prevent loading ESM-only setup in RN >=0.73
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    './jest.setup.js'
  ],
  testPathIgnorePatterns: ['/__helpers__/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      { presets: ['module:metro-react-native-babel-preset'], plugins: ['react-native-reanimated/plugin'] }
    ]
  },
  moduleNameMapper: {
    '^react-native$': 'react-native'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-clone-referenced-element|@react-native-community|react-native-reanimated)/)'
  ]
};