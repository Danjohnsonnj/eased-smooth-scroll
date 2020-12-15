import 'regenerator-runtime/runtime';
import { animateScrollBy } from '../index.js';

describe('AnimateScrollBy', () => {
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

    const { left, top } = await animateScrollBy({
      left: 0,
      top: 100,
      useNativeScroll: true,
      target: testTarget
    });

    expect(left).toEqual(0);
    expect(top).toEqual(100);
  });

  test('left: 100, top: 0, useNativeScroll: true', async () => {
    const testTarget = document.scrollingElement;

    const { left, top } = await animateScrollBy({
      left: 100,
      top: 0,
      useNativeScroll: true,
      target: testTarget
    });

    expect(left).toEqual(100);
    expect(top).toEqual(0);
  });

  test('left: 100, top: 0, duration: 200, useNativeScroll: false', async () => {
    const testTarget = document.scrollingElement;

    const { left, top } = await animateScrollBy({
      left: 100,
      top: 0,
      duration: 200,
      useNativeScroll: false,
      target: testTarget
    });

    expect(left).toEqual(100);
    expect(top).toEqual(0);
  });

  test('left: 0, top: 1000, duration: 200, useNativeScroll: false', async () => {
    const testTarget = document.scrollingElement;

    const { left, top } = await animateScrollBy({
      left: 0,
      top: 1000,
      duration: 200,
      useNativeScroll: false,
      target: testTarget
    });

    expect(left).toEqual(0);
    expect(top).toEqual(1000);
  });
});