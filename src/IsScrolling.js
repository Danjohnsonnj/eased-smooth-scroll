let timer;
const checkScrolling = (resolve, target) => {
  if (timer) {
    clearTimeout(timer);
  }

  const startLeft = target.scrollLeft;
  const startTop = target.scrollTop;

  let stopLeft, stopTop;
  timer = setTimeout(() => {
    stopLeft = target.scrollLeft;
    stopTop = target.scrollTop;

    if (startLeft !== stopLeft && startTop !== stopTop) {
      checkScrolling(resolve, target);
    }
    resolve(false);
  }, 200);
}

function isScrolling(target = document.scrollingElement) {
  return new Promise(resolve => {
    checkScrolling(resolve, target);
  });
}

module.exports = isScrolling;