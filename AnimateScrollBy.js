const animateScrollTo = require('./AnimateScrollTo');
const getOptions = require('./GetOptions');

function AnimateScrollBy(...args) {
  const { x, y, target, duration, useNativeScroll } = getOptions(...args);

  if (useNativeScroll) {
    target.scrollBy({
      top: y,
      left: x,
      behavior: 'smooth'
    })
    return;
  }

  const currentX = target.scrollLeft;
  const currentY = target.scrollTop;

  animateScrollTo({
    target,
    x: currentX + x,
    y: currentY + y,
    duration,
    useNativeScroll
  })

}

module.exports = AnimateScrollBy;