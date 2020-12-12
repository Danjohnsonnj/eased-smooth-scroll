import { animateScrollBy } from '../index.js';

describe('AnimateScrollBy', () => {
  beforeEach(() => {
    const container = document.createElement('div');
    container.id = 'scrollContainer';
    container.style.height = '10000px';
    container.style.width = '10000px';
    document.body.style.height = '1000px';
    document.body.style.width = '1000px';
    document.body.style.overflow = 'scroll';
    document.body.appendChild(container);
  });

  afterEach(() => {
    const container = document.getElementById('scrollContainer');
    document.body.removeChild(container);
    document.body.style.height = 'initial';
    document.body.style.width = 'initial';
    document.body.style.overflow = 'initial';
    scrollTo(0, 0);
  });

  // Native browser API, as a sanity check
  test('scrollBy(0, 100)', (done) => {
    const testTarget = document.scrollingElement;

    function callback() {
      const { scrollLeft, scrollTop } = testTarget;
      expect(scrollLeft).toEqual(0);
      expect(scrollTop).toEqual(100);
      done();
    }

    scrollTo(0, 100);

    setTimeout(callback, 300);
  });

  // Native browser API, as a sanity check
  test('scrollBy(100, 0)', (done) => {
    const testTarget = document.scrollingElement;

    function callback() {
      const { scrollLeft, scrollTop } = testTarget;
      expect(scrollLeft).toEqual(100);
      expect(scrollTop).toEqual(0);
      done();
    }

    scrollTo(100, 0);

    setTimeout(callback, 300);
  });

  test('x: 0, y: 100, useNativeScroll: true', (done) => {
    const testTarget = document.scrollingElement;

    function callback() {
      const { scrollLeft, scrollTop } = testTarget;
      // expect(scrollLeft).toEqual(0);
      expect(scrollTop).toEqual(100);
      done();
    }

    animateScrollBy({
      x: 0,
      y: 100,
      useNativeScroll: true,
      target: testTarget
    });

    setTimeout(callback, 300);
  });

  test('x: 100, y: 0, useNativeScroll: true', (done) => {
    const testTarget = document.scrollingElement;

    function callback() {
      const { scrollLeft, scrollTop } = testTarget;
      expect(scrollLeft).toEqual(100);
      // expect(scrollTop).toEqual(0);
      done();
    }

    animateScrollBy({
      x: 100,
      y: 0,
      useNativeScroll: true,
      target: testTarget
    });

    setTimeout(callback, 1000);
  });

  test('x: 100, y: 0, duration: 200, useNativeScroll: false', (done) => {
    const testTarget = document.scrollingElement;

    function callback() {
      const { scrollLeft, scrollTop } = testTarget;
      expect(scrollLeft).toEqual(100);
      // expect(scrollTop).toEqual(0);
      done();
    }

    animateScrollBy({
      x: 100,
      y: 0,
      duration: 200,
      useNativeScroll: false,
      target: testTarget
    });

    setTimeout(callback, 300);
  });

  test('x: 0, y: 1000, duration: 200, useNativeScroll: false', (done) => {
    const testTarget = document.scrollingElement;

    function callback() {
      const { scrollLeft, scrollTop } = testTarget;
      expect(scrollLeft).toEqual(0);
      expect(scrollTop).toEqual(1000);
      done();
    }

    animateScrollBy({
      x: 0,
      y: 1000,
      duration: 200,
      useNativeScroll: false,
      target: testTarget
    });

    setTimeout(callback, 300);
  });
});