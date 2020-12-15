import { getOptions, DEFAULT_OPTIONS } from '../src/GetOptions';

describe('GetOptions', () => {
  test('no parameters returns defaults ', () => {
    const { left, top, target, duration, useNativeScroll } = getOptions();
    expect(left).toEqual(DEFAULT_OPTIONS.left);
    expect(top).toEqual(DEFAULT_OPTIONS.top);
    expect(duration).toEqual(DEFAULT_OPTIONS.duration);
    expect(target).toEqual(DEFAULT_OPTIONS.target);
    expect(useNativeScroll).toEqual(DEFAULT_OPTIONS.useNativeScroll);
  });

  describe('Arguments: two numbers signature', () => {
    test('left returns defaults', () => {
      const { left, top, target, duration, useNativeScroll } = getOptions(1);
      expect(left).toEqual(DEFAULT_OPTIONS.left);
      expect(top).toEqual(DEFAULT_OPTIONS.top);
      expect(duration).toEqual(DEFAULT_OPTIONS.duration);
      expect(target).toEqual(DEFAULT_OPTIONS.target);
      expect(useNativeScroll).toEqual(DEFAULT_OPTIONS.useNativeScroll);
    });
    test('left, top, overloaded returns defaults', () => {
      const { left, top, target, duration, useNativeScroll } = getOptions(1, 2, false);
      expect(left).toEqual(DEFAULT_OPTIONS.left);
      expect(top).toEqual(DEFAULT_OPTIONS.top);
      expect(duration).toEqual(DEFAULT_OPTIONS.duration);
      expect(target).toEqual(DEFAULT_OPTIONS.target);
      expect(useNativeScroll).toEqual(DEFAULT_OPTIONS.useNativeScroll);
    });
    test('left, top returns left, top and ...defaults', () => {
      const { left, top, target, duration, useNativeScroll } = getOptions(1, 2);
      expect(left).toEqual(1);
      expect(top).toEqual(2);
      expect(duration).toEqual(DEFAULT_OPTIONS.duration);
      expect(target).toEqual(DEFAULT_OPTIONS.target);
      expect(useNativeScroll).toEqual(DEFAULT_OPTIONS.useNativeScroll);
    });
  });

  describe('Arguments: object signature', () => {
    test('left, top returns left, top and ...defaults', () => {
      const options = { left: 1, top: 2 };
      const { left, top, target, duration, useNativeScroll } = getOptions(options);
      expect(left).toEqual(options.left);
      expect(top).toEqual(options.top);
      expect(duration).toEqual(DEFAULT_OPTIONS.duration);
      expect(target).toEqual(DEFAULT_OPTIONS.target);
      expect(useNativeScroll).toEqual(DEFAULT_OPTIONS.useNativeScroll);
    });
    test('duration returns duration and ...defaults', () => {
      const options = { duration: 2000 };
      const { left, top, target, duration, useNativeScroll } = getOptions(options);
      expect(left).toEqual(DEFAULT_OPTIONS.left);
      expect(top).toEqual(DEFAULT_OPTIONS.top);
      expect(duration).toEqual(options.duration);
      expect(target).toEqual(DEFAULT_OPTIONS.target);
      expect(useNativeScroll).toEqual(DEFAULT_OPTIONS.useNativeScroll);
    });
  });
});