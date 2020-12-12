import { getOptions, DEFAULT_OPTIONS } from '../GetOptions'

describe('GetOptions', () => {
  test('no parameters returns defaults ', () => {
    const { x, y, target, duration, useNativeScroll } = getOptions();
    expect(x).toEqual(DEFAULT_OPTIONS.x);
    expect(y).toEqual(DEFAULT_OPTIONS.y);
    expect(duration).toEqual(DEFAULT_OPTIONS.duration);
    expect(target).toEqual(DEFAULT_OPTIONS.target);
    expect(useNativeScroll).toEqual(DEFAULT_OPTIONS.useNativeScroll);
  });

  describe('Arguments: two numbers signature', () => {
    test('x returns defaults', () => {
      const { x, y, target, duration, useNativeScroll } = getOptions(1);
      expect(x).toEqual(DEFAULT_OPTIONS.x);
      expect(y).toEqual(DEFAULT_OPTIONS.y);
      expect(duration).toEqual(DEFAULT_OPTIONS.duration);
      expect(target).toEqual(DEFAULT_OPTIONS.target);
      expect(useNativeScroll).toEqual(DEFAULT_OPTIONS.useNativeScroll);
    });
    test('x, y, overloaded returns defaults', () => {
      const { x, y, target, duration, useNativeScroll } = getOptions(1, 2, false);
      expect(x).toEqual(DEFAULT_OPTIONS.x);
      expect(y).toEqual(DEFAULT_OPTIONS.y);
      expect(duration).toEqual(DEFAULT_OPTIONS.duration);
      expect(target).toEqual(DEFAULT_OPTIONS.target);
      expect(useNativeScroll).toEqual(DEFAULT_OPTIONS.useNativeScroll);
    });
    test('x, y returns x, y and ...defaults', () => {
      const { x, y, target, duration, useNativeScroll } = getOptions(1, 2);
      expect(x).toEqual(1);
      expect(y).toEqual(2);
      expect(duration).toEqual(DEFAULT_OPTIONS.duration);
      expect(target).toEqual(DEFAULT_OPTIONS.target);
      expect(useNativeScroll).toEqual(DEFAULT_OPTIONS.useNativeScroll);
    });
  });

  describe('Arguments: object signature', () => {
    test('x, y returns x, y and ...defaults', () => {
      const options = { x: 1, y: 2 };
      const { x, y, target, duration, useNativeScroll } = getOptions(options);
      expect(x).toEqual(options.x);
      expect(y).toEqual(options.y);
      expect(duration).toEqual(DEFAULT_OPTIONS.duration);
      expect(target).toEqual(DEFAULT_OPTIONS.target);
      expect(useNativeScroll).toEqual(DEFAULT_OPTIONS.useNativeScroll);
    });
    test('duration returns duration and ...defaults', () => {
      const options = { duration: 2000 };
      const { x, y, target, duration, useNativeScroll } = getOptions(options);
      expect(x).toEqual(DEFAULT_OPTIONS.x);
      expect(y).toEqual(DEFAULT_OPTIONS.y);
      expect(duration).toEqual(options.duration);
      expect(target).toEqual(DEFAULT_OPTIONS.target);
      expect(useNativeScroll).toEqual(DEFAULT_OPTIONS.useNativeScroll);
    });
  });
});