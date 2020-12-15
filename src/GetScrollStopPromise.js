const isScrolling = require('./isScrolling');

const getScrollStopPromise = function(scrollEl = document.scrollingElement, resolveImmediately = false) {
  if (resolveImmediately) {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ left: scrollEl.scrollLeft, top: scrollEl.scrollTop }), 100);
    });
  }

  return new Promise((resolve) => {
    const scrollHandler = () => {
      isScrolling()
        .then(() => {
          resolve({ left: scrollEl.scrollLeft, top: scrollEl.scrollTop });
          document.removeEventListener('scroll', scrollHandler);
        });
    };
    document.addEventListener('scroll', scrollHandler);
  });
}

module.exports = getScrollStopPromise;