const animateScrollTo = require('./AnimateScrollTo');
const getOptions = require('./GetOptions');
const isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;

function AnimateScrollBy(options) {
  const { x, y, target, duration } = getOptions(options);

  // TODO: add option to skip native
  if (isSmoothScrollSupported) {
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
    duration
  })

}

module.exports = AnimateScrollBy;