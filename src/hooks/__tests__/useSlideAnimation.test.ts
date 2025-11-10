/* eslint-env jest */

import { renderHook } from '@testing-library/react-hooks';

import {
  translateYOutputRangeFor,
  useSlideAnimation
} from '../useSlideAnimation';

const defaultParams = {
  topOffset: 40,
  bottomOffset: 60,
  keyboardOffset: 5,
  avoidKeyboard: true
};

const setup = () => {
  const utils = renderHook(() =>
    useSlideAnimation({
      position: 'top',
      height: 20,
      ...defaultParams
    })
  );
  return {
    ...utils
  };
};

describe('test useSlideAnimation hook', () => {
  it('returns defaults', () => {
    const { result } = setup();
    const { animatedValue, animate, animationStyles } = result.current;

    expect(animatedValue).toBeDefined();
    expect(typeof animatedValue.value).toBe('number');
    expect(animate).toBeDefined();
    expect(animationStyles.opacity).toBeDefined();
    expect(animationStyles.transform).toBeDefined();
  });

  it('animates to a new value', async () => {
    const { result } = setup();
    result.current.animate(1);
    expect(result.current.animatedValue.value).toBe(1);
  });
});

describe('test translateYOutputRangeFor function', () => {
  it('returns output range for position: top', () => {
    expect(
      translateYOutputRangeFor({
        position: 'top',
        height: 20,
        keyboardHeight: 0,
        ...defaultParams
      })
    ).toEqual([-40, 40]);
  });

  it('returns output range for position: bottom', () => {
    expect(
      translateYOutputRangeFor({
        position: 'bottom',
        height: 20,
        keyboardHeight: 0,
        ...defaultParams
      })
    ).toEqual([40, -60]);
  });

  it('returns output range for position: bottom, with keyboard offset', () => {
    expect(
      translateYOutputRangeFor({
        position: 'bottom',
        height: 20,
        keyboardHeight: 400,
        ...defaultParams
      })
    ).toEqual([40, -405]);
  });
});