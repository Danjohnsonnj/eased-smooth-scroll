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

  test('x: 0, y: 100, useNativeScroll: true', async () => {
    const testTarget = document.scrollingElement;

    const { x, y } = await animateScrollTo({
      x: 0,
      y: 100,
      useNativeScroll: true,
      target: testTarget
    });

    expect(x).toEqual(0);
    expect(y).toEqual(100);
    expect(testTarget.scrollLeft).toEqual(x);
    expect(testTarget.scrollTop).toEqual(y);
  });

  test('x: 100, y: 0, useNativeScroll: true', async () => {
    const testTarget = document.scrollingElement;

    const { x, y } = await animateScrollTo({
      x: 100,
      y: 0,
      useNativeScroll: true,
      target: testTarget
    });

    expect(x).toEqual(100);
    expect(y).toEqual(0);
    expect(testTarget.scrollLeft).toEqual(x);
    expect(testTarget.scrollTop).toEqual(y);
  });

  test('x: 100, y: 0, duration: 500, useNativeScroll: false', async () => {
    const testTarget = document.scrollingElement;

    const { x, y } = await animateScrollTo({
      x: 100,
      y: 0,
      duration: 500,
      useNativeScroll: false,
      target: testTarget
    });

    expect(x).toEqual(100);
    expect(y).toEqual(0);
    expect(testTarget.scrollLeft).toEqual(x);
    expect(testTarget.scrollTop).toEqual(y);
  });

  test('x: 0, y: 1000, duration: 200, useNativeScroll: false', async () => {
    const testTarget = document.scrollingElement;

    const { x, y } = await animateScrollTo({
      x: 0,
      y: 1000,
      duration: 200,
      useNativeScroll: false,
      target: testTarget
    });

    expect(x).toEqual(0);
    expect(y).toEqual(1000);
    expect(testTarget.scrollLeft).toEqual(x);
    expect(testTarget.scrollTop).toEqual(y);
  });

  test('x: 0, y: 0, duration: 200, useNativeScroll: false', async () => {
    const testTarget = document.scrollingElement;

    const { x, y } = await animateScrollTo({
      x: 0,
      y: 0,
      duration: 200,
      useNativeScroll: false,
      target: testTarget
    });

    expect(x).toEqual(0);
    expect(y).toEqual(0);
    expect(testTarget.scrollLeft).toEqual(x);
    expect(testTarget.scrollTop).toEqual(y);
  });

  test('x: 0, y: 1000, duration: 500, useNativeScroll: false, interrupted', (done) => {
    const testTarget = document.scrollingElement;
    const mousewheelevt = 'onmousewheel' in document ? 'wheel' : 'mousewheel';

    animateScrollTo({
      x: 1000,
      y: 1000,
      duration: 500,
      useNativeScroll: false,
      target: testTarget
    }).then(({ x, y }) => {
      expect(x).not.toEqual(0);
      expect(x).not.toEqual(1000);
      expect(testTarget.scrollLeft).toEqual(x);
      expect(y).not.toEqual(0);
      expect(y).not.toEqual(1000);
      expect(testTarget.scrollTop).toEqual(y);
      done();
    });
    setTimeout(() => {
      document.dispatchEvent(new Event(mousewheelevt));
    }, 100);
  });
});