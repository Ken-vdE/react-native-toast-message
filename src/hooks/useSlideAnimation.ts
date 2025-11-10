import React from 'react';
import { useSharedValue, withSpring, useAnimatedStyle, interpolate } from 'react-native-reanimated';

import { ToastPosition } from '../types';
import { additiveInverseArray } from '../utils/array';
import { useKeyboard } from './useKeyboard';

type UseSlideAnimationParams = {
  position: ToastPosition;
  height: number;
  topOffset: number;
  bottomOffset: number;
  keyboardOffset: number;
  avoidKeyboard: boolean;
};

export function translateYOutputRangeFor({
  position,
  height,
  topOffset,
  bottomOffset,
  keyboardHeight,
  keyboardOffset,
  avoidKeyboard
}: UseSlideAnimationParams & {
  keyboardHeight: number;
}) {
  'worklet';

  const offset = position === 'bottom' ? bottomOffset : topOffset;
  const keyboardAwareOffset =
    position === 'bottom' && avoidKeyboard ? keyboardHeight + keyboardOffset : 0;

  const range = [-(height * 2), Math.max(offset, keyboardAwareOffset)];
  const outputRange =
    position === 'bottom' ? additiveInverseArray(range) : range;

  return outputRange;
}

export function useSlideAnimation({
  position,
  height,
  topOffset,
  bottomOffset,
  keyboardOffset,
  avoidKeyboard
}: UseSlideAnimationParams) {
  const animatedValue = useSharedValue(0);
  const { keyboardHeight } = useKeyboard();

  const animate = React.useCallback((toValue: number) => {
    animatedValue.value = withSpring(toValue, { damping: 20, stiffness: 200 });
  }, [animatedValue]);

  const animationStyles = useAnimatedStyle(() => {
    const translateYOutputRange = translateYOutputRangeFor({
      position,
      height,
      topOffset,
      bottomOffset,
      keyboardHeight,
      keyboardOffset,
      avoidKeyboard
    });

    const translateY = interpolate(
      animatedValue.value,
      [0, 1],
      translateYOutputRange
    );

    const opacity = interpolate(animatedValue.value, [0, 0.7, 1], [0, 1, 1]);

    return {
      opacity,
      transform: [{ translateY }]
    };
  }, [position, height, topOffset, bottomOffset, keyboardHeight, keyboardOffset, avoidKeyboard]);

  return {
    animatedValue,
    animate,
    animationStyles
  };
}