import 'regenerator-runtime/runtime';
import { animateScrollTo } from '../index.js';

describe('AnimateScrollTo', () => {
  beforeAll(() => {
    const container = document.createElement('div');
    container.id = 'scrollContainer';
    container.style.height = '10000px';
    container.style.width = '10000px';
    document.body.style.height = '1000px';
    document.body.style.width = '1000px';
    document.body.style.overflow = 'scroll';
    document.body.appendChild(container);
  });

  beforeEach(() => {
    scrollTo(0, 0);
  });

  afterEach(() => {
    scrollTo(0, 0);
  });

  test('left: 0, top: 100, useNativeScroll: true', async () => {
    const testTarget = document.scrollingElement;

    const { left, top } = await animateScrollTo({
      left: 0,
      top: 100,
      useNativeScroll: true,
      target: testTarget
    });

    expect(left).toEqual(0);
    expect(top).toEqual(100);
    expect(testTarget.scrollLeft).toEqual(left);
    expect(testTarget.scrollTop).toEqual(top);
  });

  test('left: 100, top: 0, useNativeScroll: true', async () => {
    const testTarget = document.scrollingElement;

    const { left, top } = await animateScrollTo({
      left: 100,
      top: 0,
      useNativeScroll: true,
      target: testTarget
    });

    expect(left).toEqual(100);
    expect(top).toEqual(0);
    expect(testTarget.scrollLeft).toEqual(left);
    expect(testTarget.scrollTop).toEqual(top);
  });

  test('left: 100, top: 0, duration: 500, useNativeScroll: false', async () => {
    const testTarget = document.scrollingElement;

    const { left, top } = await animateScrollTo({
      left: 100,
      top: 0,
      duration: 500,
      useNativeScroll: false,
      target: testTarget
    });

    expect(left).toEqual(100);
    expect(top).toEqual(0);
    expect(testTarget.scrollLeft).toEqual(left);
    expect(testTarget.scrollTop).toEqual(top);
  });

  test('left: 0, top: 1000, duration: 200, useNativeScroll: false', async () => {
    const testTarget = document.scrollingElement;

    const { left, top } = await animateScrollTo({
      left: 0,
      top: 1000,
      duration: 200,
      useNativeScroll: false,
      target: testTarget
    });

    expect(left).toEqual(0);
    expect(top).toEqual(1000);
    expect(testTarget.scrollLeft).toEqual(left);
    expect(testTarget.scrollTop).toEqual(top);
  });

  test('left: 0, top: 0, duration: 200, useNativeScroll: false', async () => {
    const testTarget = document.scrollingElement;

    const { left, top } = await animateScrollTo({
      left: 0,
      top: 0,
      duration: 200,
      useNativeScroll: false,
      target: testTarget
    });

    expect(left).toEqual(0);
    expect(top).toEqual(0);
    expect(testTarget.scrollLeft).toEqual(left);
    expect(testTarget.scrollTop).toEqual(top);
  });

  test('left: 0, top: 1000, duration: 500, useNativeScroll: false, interrupted', (done) => {
    const testTarget = document.scrollingElement;
    const mousewheelevt = 'onmousewheel' in document ? 'wheel' : 'mousewheel';

    animateScrollTo({
      left: 1000,
      top: 1000,
      duration: 500,
      useNativeScroll: false,
      target: testTarget
    }).then(({ left, top }) => {
      expect(left).not.toEqual(0);
      expect(left).not.toEqual(1000);
      expect(testTarget.scrollLeft).toEqual(left);
      expect(top).not.toEqual(0);
      expect(top).not.toEqual(1000);
      expect(testTarget.scrollTop).toEqual(top);
      done();
    });
    setTimeout(() => {
      document.dispatchEvent(new Event(mousewheelevt));
    }, 100);
  });
});