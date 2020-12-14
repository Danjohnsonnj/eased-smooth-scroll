const isScrolling = require('./isScrolling');

const getScrollStopPromise = function(scrollEl = document.scrollingElement, resolveImmediately = false) {
  if (resolveImmediately) {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ x: scrollEl.scrollLeft, y: scrollEl.scrollTop }), 100);
    });
  }

  return new Promise((resolve) => {
    const scrollHandler = () => {
      isScrolling()
        .then(() => {
          resolve({ x: scrollEl.scrollLeft, y: scrollEl.scrollTop });
          document.removeEventListener('scroll', scrollHandler);
        });
    };
    document.addEventListener('scroll', scrollHandler);
  });
}

module.exports = getScrollStopPromise;