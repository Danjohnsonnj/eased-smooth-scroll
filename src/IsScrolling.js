let timer;
const checkScrolling = (resolve, target) => {
  if (timer) {
    clearTimeout(timer);
  }

  const startx = target.scrollLeft;
  const starty = target.scrollTop;

  let stopx, stopy;
  timer = setTimeout(() => {
    stopx = target.scrollLeft;
    stopy = target.scrollTop;

    if (startx !== stopx && starty !== stopy) {
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