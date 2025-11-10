/* eslint-env jest */

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock Reanimated v4 for Jest environment
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));